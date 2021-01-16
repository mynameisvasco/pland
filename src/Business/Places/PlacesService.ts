import { Injectable } from "kioto/build";
import { Coordinates } from "../../Domain/Models/Coordinates";
import { DatabaseService } from "../../Infrastructure/Database/DatabaseService";
import { OpenRouteService } from "../../Infrastructure/Location/OpenRouteService";
import { FindByLocationDto } from "./Dto/FindByLocationDto";
import { CreateDto } from "./Dto/CreateDto";
import { Place } from "../../Domain/Entities/Place";
import { areIntervalsOverlapping } from "date-fns";
import { Like } from "typeorm";

@Injectable()
export class PlacesService {
  constructor(
    private databaseService: DatabaseService,
    private openRouteService: OpenRouteService
  ) {}

  async create(createDto: CreateDto) {
    const { databaseService } = this;
    const places = databaseService.places.create(createDto);
    await databaseService.places.save(places);
  }

  async findById(id: number, relations: string[] = []) {
    const { databaseService } = this;
    return await databaseService.places.findOne(id, { relations });
  }

  async findByNameLike(name: string) {
    const { databaseService } = this;
    return await databaseService.places.find({ name: Like(`%${name}%`) });
  }

  async findByLocation(dto: FindByLocationDto, relations: string[] = []) {
    const { databaseService, openRouteService } = this;
    const places = await databaseService.places.find({ relations });
    return places.filter(
      (place) =>
        openRouteService.distanceInKm(place.location, dto.coordinates) <=
        dto.radius
    );
  }

  async findByAddress(address: string, relations: string[] = []) {
    const { databaseService, openRouteService } = this;
    const locations = await this.findAddressLocation(address);
    const places = await databaseService.places.find({ relations });
    return places.filter(
      (place) =>
        openRouteService.distanceInKm(
          place.location,
          locations[0].coordinates
        ) <= 10
    );
  }

  async findAddressLocation(address: string) {
    return await this.openRouteService.searchAddress(address);
  }

  findLastEventOnPlace(place: Place) {
    if (!place.events) return undefined;
    return place.events[place.events.length - 1];
  }

  isPlaceAvailableAt(place: Place, startsAt: Date, endsAt: Date) {
    if (
      !place.availableDays.includes(startsAt.getDay()) ||
      !place.availableDays.includes(endsAt.getDay())
    ) {
      return false;
    }
    if (
      startsAt.getHours() <= place.opensAt.getHours() &&
      endsAt.getHours() >= place.closesAt.getHours()
    ) {
      return false;
    }
    const lastEvent = this.findLastEventOnPlace(place);
    if (!lastEvent) return true;
    return !areIntervalsOverlapping(
      { start: startsAt, end: endsAt },
      { start: lastEvent.startsAt, end: lastEvent.endsAt }
    );
  }
}
