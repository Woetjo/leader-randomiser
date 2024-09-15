import {CampaignOptionItem} from "./CampaignOptionItem";

export interface Campaign {
  AvailableAircraft: Array<string>;
  CampaignOptions: Array<CampaignOptionItem>;
  Difficulty: number;
  DifficultyDescription: string;
  Name: string;
  SpecialWeapons: Array<string>
  Year: number;
}
