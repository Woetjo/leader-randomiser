export interface AircraftType {
  Designation: string;
  Name: string;
  Type: string;
  StartYear: number
  EndYear: number;
  Cost?: {
    short: number;
    medium: number;
    long: number;
  }
}
