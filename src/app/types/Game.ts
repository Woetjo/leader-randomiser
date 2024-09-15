import {Campaign} from "./Campaign";
import {AircraftType} from "./AircraftType";
import {Pilot} from "./Pilot";

export interface Game {
  Campaigns: Array<Campaign>;
  Name: string;
  Pilots: Array<Pilot>;
  AircraftTypes: Array<AircraftType>;
}
