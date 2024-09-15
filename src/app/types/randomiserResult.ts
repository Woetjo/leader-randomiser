import {AvailablePilotInSelectedCampaign} from "./availablePilotInSelectedCampaign";

export interface RandomiserResult {
  pilots: {
    Newbie: AvailablePilotInSelectedCampaign[];
    Green: AvailablePilotInSelectedCampaign[];
    Average: AvailablePilotInSelectedCampaign[];
    Skilled: AvailablePilotInSelectedCampaign[];
  }
  so: {
    campaign: number;
    aircraft: number;
  }
}
