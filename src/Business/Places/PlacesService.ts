import { Injectable } from "nelso/build";
import { Coordinates } from "../../Domain/Models/Coordinates";
import { DatabaseService } from "../../Infrastructure/Database/DatabaseService";
import { OpenRouteService } from "../../Infrastructure/Location/OpenRouteService";
import { FindByLocationDto } from "./Dto/FindByLocationDto";

@Injectable()
export class PlacesService {
  constructor(
    private databaseService: DatabaseService,
    private openRouteService: OpenRouteService
  ) {}

  async findByLocation(dto: FindByLocationDto) {
    const places = await this.databaseService.places.find();
    const userLocation = new Coordinates(dto.latitude, dto.longitude);
    return places.filter(
      (p) =>
        this.distanceBetweenCoordinates(p.location, userLocation) <= dto.radius
    );
  }

  async searchLocation(address: string) {
    this.openRouteService.searchLocation(address);
  }

  distanceBetweenCoordinates(coord1: Coordinates, coord2: Coordinates) {
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
