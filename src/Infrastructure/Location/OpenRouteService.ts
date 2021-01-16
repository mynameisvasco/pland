import axios from "axios";
import { Config, Injectable } from "kioto/build";
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

  async searchAddress(address: string): Promise<Location> {
    try {
      const request = await axios.get(
        `${this.baseUrl}/geocode/search?api_key=${this.apiKey}&text=${address}`
      );
      const { features } = request.data;
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
      throw new Error("OpenRoute is not available.");
    }
  }

  distanceInKm(coord1: Coordinates, coord2: Coordinates) {
    const { latitude: lat1, longitude: lon1 } = coord1;
    const { latitude: lat2, longitude: lon2 } = coord2;
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  deg2rad(degree: number) {
    return degree * (Math.PI / 180);
  }
}
