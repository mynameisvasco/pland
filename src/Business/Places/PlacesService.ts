import { Injectable } from "nelso/build";
import { Coordinates } from "../../Domain/Models/Coordinates";
import { DatabaseService } from "../../Infrastructure/Database/DatabaseService";
import { OpenRouteService } from "../../Infrastructure/Location/OpenRouteService";
import { FindByAddressDto } from "./Dto/FindByAddressDto";
import { FindByLocationDto } from "./Dto/FindByLocationDto";
import { SearchAddressQuery } from "./Queries/SearchAddressQuery";

@Injectable()
export class PlacesService {
  constructor(
    private databaseService: DatabaseService,
    private openRouteService: OpenRouteService
  ) {}

  async findById(id: number) {
    return await this.databaseService.events.findOne(id);
  }

  async findByLocation(dto: FindByLocationDto) {
    const { databaseService, openRouteService } = this;
    const places = await databaseService.places.find();
    const userCoordinates = new Coordinates(dto.latitude, dto.longitude);
    return places.filter(
      (place) =>
        openRouteService.distanceInKm(place.location, userCoordinates) <=
        dto.radius
    );
  }

  async findByAddress(dto: FindByAddressDto) {
    const { databaseService, openRouteService } = this;
    const locations = await this.findLocationByAddress({
      address: dto.address,
    });
    const places = await databaseService.places.find();
    return places.filter(
      (place) =>
        openRouteService.distanceInKm(
          place.location,
          locations[0].coordinates
        ) <= 10
    );
  }

  async findLocationByAddress(query: SearchAddressQuery) {
    return await this.openRouteService.searchAddress(query.address);
  }
}
