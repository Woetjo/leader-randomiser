import {Component, inject, OnInit} from '@angular/core';
import {ReadFileService} from "../../services/read-file.service";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {Games} from "../../data/Games";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {Router, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {Game} from "../../types/Game";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Campaign} from "../../types/Campaign";
import {CampaignOptionItem} from "../../types/CampaignOptionItem";
import {SquadronMakeupItem} from "../../types/SquadronMakeupItem";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgForOf,
    NgIf,
    RouterOutlet,
    SidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit {
  protected readonly Games = Games;

  fileService = inject(ReadFileService);
  formBuilder = inject(FormBuilder);
  state = inject(StateService);
  router = inject(Router);

  leaderForm = this.formBuilder.group({
    campaign: ['', Validators.required],
    campaignOptionItem: ['', Validators.required]
  })

  ngOnInit() {
    let gameItem = this.state.readLocalStorage();
    if (gameItem) {
      this.chooseGame(gameItem);
    }

    this.leaderForm.get('campaign')?.valueChanges.subscribe(
      campaign => this.selectedCampaignChanged(campaign)
    );

    this.leaderForm.get('campaignOptionItem')?.valueChanges.subscribe(
      campaignOptionItem => this.selectedCampaignOptionsChanged(campaignOptionItem)
    )
  }

  selectedCampaignChanged(campaign: Campaign | string | null) {
    this.state.selectedCampaign.set(campaign as Campaign);
    this.state.selectedCampaignOptionItem.set(undefined);
  }

  selectedCampaignOptionsChanged(campaignOptionItem: CampaignOptionItem | string | null) {
    this.state.selectedCampaignOptionItem.set(campaignOptionItem as CampaignOptionItem);
  }

  chooseGame(gameItem: any) {
    this.state.writeLocalStorage(gameItem);
    this.fileService.getFile(gameItem.filename).subscribe(
      {
        next: (gamedata: Game) => {
          this.state.selectedGame.set(gamedata);
          this.state.selectedCampaign.set(undefined);
          this.state.selectedCampaignOptionItem.set(undefined);
        }
      }
    )
  }

  showSquadronMakeup(squadronMakeup: Array<SquadronMakeupItem> | undefined) {
    let result: string = '';
    squadronMakeup?.forEach(item => {
      result += item.Count + ' ' + item.RankDescription + ', ';
    })
    return result.substring(0, result.length - 2);
  }

  submitForm() {
    if (this.leaderForm.valid) {
      this.router.navigate(['/result']);
    } else {
      console.error('Form not valid');
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
}
