import axios from "axios";
import { add } from "date-fns";
import { Config, HttpException, Injectable } from "nelso/build";
import { Coordinates } from "../../Domain/Models/Coordinates";
import { Location } from "../../Domain/Models/Location";

@Injectable()
export class OpenRouteService {
  private apiKey: string;
  private baseUrl: string;

  constructor(private config: Config) {
    this.apiKey = this.config.get("open-route-api-key");
    this.baseUrl = "https://api.openrouteservice.org";
  }

  async searchLocation(address: string): Promise<Location> {
    try {
      const searched = await axios.get(
        `${this.baseUrl}/geocode/search?${this.apiKey}&text=${address}`
      );
      const { features } = searched.data;
      return features.map((f: any) => {
        return {
          address: f.properties.label,
          coordinates: new Coordinates(
            f.geometry.coordinates[0],
            f.geometry.coordinates[1]
          ),
        } as Location;
      });
    } catch (e) {
      console.log(e);
    }
  }
}
