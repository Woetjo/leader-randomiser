import {SquadronMakeupItem} from "./SquadronMakeupItem";

export interface CampaignOptionItem {
  Length: number;
  LengthDescription: string;
  SOPoints: number
  SquadronMakeup: Array<SquadronMakeupItem>;
  Timespan: string;
}
