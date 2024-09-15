import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {StateService} from "../../services/state.service";
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {Pilot} from "../../types/Pilot";
import {AircraftType} from "../../types/AircraftType";
import {AvailablePilotInSelectedCampaign} from "../../types/availablePilotInSelectedCampaign";
import {RandomiserResult} from "../../types/randomiserResult";
import {Router} from "@angular/router";

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    NgForOf,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    SidebarComponent,
    CommonModule
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  state = inject(StateService);
  router = inject(Router);
  availablePilotsInSelectedCampaign: Array<AvailablePilotInSelectedCampaign> = [];
  availableAircraft?: string[] = this.state.selectedCampaign()?.AvailableAircraft;
  availableAircraftTypes?: AircraftType[] = this.state.selectedGame()?.AircraftTypes;
  allPilots?: Pilot[] = this.state.selectedGame()?.Pilots;
  randomiserResult: RandomiserResult = {
    pilots: {
      Newbie: [],
      Green: [],
      Average: [],
      Skilled: []
    },
    so: {
      campaign: this.state.selectedCampaignOptionItem()?.SOPoints ?? 0,
      aircraft: 0
    }
  }

  ngOnInit() {
    this.randomise();
  }

  randomise() {
    this.reset();
    this.computeAvailablePilots();
    this.randomiseSquadron();
    this.calculatePilotSoPoints();
    if (this.randomiserResult.so.campaign + this.randomiserResult.so.aircraft < 0) {
      console.log('Negative SO points. Randomising again.');
      this.randomise();
    }
  }

  computeAvailablePilots() {
    this.allPilots?.forEach((pilot: Pilot) => {
      if (this.availableAircraft?.includes(pilot.Aircraft)) {
        this.availablePilotsInSelectedCampaign.push({
          pilot: pilot,
          aircraftType: this.availableAircraftTypes?.find(aircraftType => aircraftType.Designation === pilot.Aircraft)
        })
      }
    })
  }

  randomiseSquadron() {
    this.randomiseSquadronForRank('Newbie');
    this.randomiseSquadronForRank('Green');
    this.randomiseSquadronForRank('Average');
    this.randomiseSquadronForRank('Skilled');
    // There is never an Ace in a starting squadron
  }


  randomiseSquadronForRank(rankDescription: string) {
    const amount = this.state.selectedCampaignOptionItem()?.SquadronMakeup.find(s => s.RankDescription === rankDescription)?.Count ?? 0;
    for (let i = 0; i < amount; i++) {
      let randomIndex: number = Math.floor(Math.random() * this.availablePilotsInSelectedCampaign.length);
      // @ts-ignore
      this.randomiserResult.pilots[rankDescription].push(this.availablePilotsInSelectedCampaign[randomIndex]); // add to selected pilots
      this.availablePilotsInSelectedCampaign = this.availablePilotsInSelectedCampaign.filter((e, index) => index !== randomIndex); // remove from available pool of pilots
    }
  }


  private calculatePilotSoPoints() {
    this.randomiserResult.so.aircraft -= this.calculatePilotSoPointsForRank('Newbie');
    this.randomiserResult.so.aircraft -= this.calculatePilotSoPointsForRank('Green');
    this.randomiserResult.so.aircraft -= this.calculatePilotSoPointsForRank('Average');
    this.randomiserResult.so.aircraft -= this.calculatePilotSoPointsForRank('Skilled');
  }

  private calculatePilotSoPointsForRank(rankDescription: string): number {
    let cost = 0;
    // @ts-ignore
    this.randomiserResult.pilots[rankDescription].forEach(chosenPilot => {
      if (chosenPilot.aircraftType.Cost) {
        // @ts-ignore
        cost += chosenPilot.aircraftType.Cost[this.state.selectedCampaignOptionItem()?.LengthDescription.toLowerCase()];
      }
    })
    return cost;
  }

  private reset() {
    this.availablePilotsInSelectedCampaign = [];
    this.randomiserResult = {
      pilots: {
        Newbie: [],
        Green: [],
        Average: [],
        Skilled: []
      },
      so: {
        campaign: this.state.selectedCampaignOptionItem()?.SOPoints ?? 0,
        aircraft: 0
      }
    }
  }

  backToSelect() {
    this.state.reset();
    this.router.navigateByUrl('/');
  }

  getAircraftCost(aircraftType: AircraftType | undefined) {
    if (aircraftType?.Cost) {
      // @ts-ignore
      return 0 - aircraftType.Cost[this.state.selectedCampaignOptionItem()?.LengthDescription.toLowerCase()];
    } else {
      return 0;
    }
  }

  showList(list: Array<string> | undefined) {
    let result: string = '';
    if (Array.isArray(list) && list.length > 0) {
      list.forEach((item) => {
        result += item + ', ';
      })
      return result.substring(0, result.length - 2);
    } else {
      return 'none';
    }
  }

  calcTotalSoPoints() {
    // @ts-ignore
    return this.state.selectedCampaignOptionItem()?.SOPoints + this.randomiserResult?.so?.aircraft;
  }
}
