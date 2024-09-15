import {Injectable, signal} from '@angular/core';
import {Campaign} from "../types/Campaign";
import {CampaignOptionItem} from "../types/CampaignOptionItem";
import {Game} from "../types/Game";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private LOCALSTORAGE_IDENTIFIER = 'DGVLeaderRandomiserByWoetjo'

  selectedGame = signal<Game | undefined>(undefined);
  selectedCampaign = signal<Campaign | undefined>(undefined);
  selectedCampaignOptionItem = signal<CampaignOptionItem | undefined>(undefined);

  reset() {
    this.selectedCampaign.set(undefined);
    this.selectedCampaignOptionItem.set(undefined);
  }

  readLocalStorage(): any {
    let game = window.localStorage.getItem(this.LOCALSTORAGE_IDENTIFIER);
    let returnValue;
    if (game) {
      try {
        returnValue = JSON.parse(game);
      } catch {
        returnValue = false;
      }
    }
    return returnValue;
  }

  writeLocalStorage(gameItem: any) {
    window.localStorage.setItem(this.LOCALSTORAGE_IDENTIFIER, JSON.stringify(gameItem));
  }


}
