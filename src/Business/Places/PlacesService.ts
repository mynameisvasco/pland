import { Injectable } from "nelso/build";
import { Coordinates } from "../../Domain/Models/Coordinates";
import { DatabaseService } from "../../Infrastructure/Database/DatabaseService";
import { OpenRouteService } from "../../Infrastructure/Location/OpenRouteService";
import { FindByAddressQuery } from "./Queries/FindByAddressQuery";
import { FindByLocationDto } from "./Dto/FindByLocationDto";
import { CreateDto } from "./Dto/CreateDto";
import { SearchAddressQuery } from "./Queries/SearchAddressQuery";
import { FindByIDQuery } from "./Queries/FindByIDQuery";
import { length } from "class-validator";
import { WeekDays } from "../../Domain/Enums/WeekDays"

// check overlap

@Injectable()
export class PlacesService {
  constructor(
    private databaseService: DatabaseService,
    private openRouteService: OpenRouteService
  ) { }

  async create(createDto: CreateDto) {
    const { databaseService } = this;
    const places = databaseService.places.create(createDto);
    await databaseService.places.save(places);
  }

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

  async findByAddress(dto: FindByAddressQuery) {
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

  async findByID(query: FindByIDQuery) {
    const { databaseService } = this;
    const places = await databaseService.places.find();
    return places.filter((place) => place.id == query.id)
  }

  async checkAvailability(id: number, happening: Date) {
    //assuming a single venue can only host 1 event per day -> means it doesn't check
    const { databaseService } = this;
    const places = await databaseService.places.find();
    const place = places.filter((place) => place.id == id)[0]
    //redo include (array is char)
    var found = false
    const day = happening.getDay()
    place.availableDays.forEach(element => {
      if (Number(element) == day)
        found = true
    });
    if (!found) {
      return false
    }
    const events = place.events
    const opening = place.opensAt
    const openingHours = opening.getHours()
    const openingMinutes = opening.getMinutes()
    const happenningHours = happening.getHours()
    const happeningMinutes = happening.getMinutes()

    if (openingHours > happenningHours || (openingHours == happenningHours && openingMinutes > happeningMinutes)) {
      //starting before open hours
      return false
    }


    const closing = place.closesAt
    const closingHours = closing.getHours()
    const closingMinutes = closing.getMinutes()

    if (happenningHours > closingHours || (happenningHours == closingHours && happeningMinutes > closingMinutes)) {
      //starting after closing hours
      return false
    }


    if (events != undefined) {
      if (events.length > 0) {
        events.forEach(event => {
          //checking if there are any other events happening in the same day
          if (event.happensAt.getDay() == happening.getDay() && event.happensAt.getMonth() == happening.getMonth() && event.happensAt.getFullYear() == happening.getFullYear()) {
            return false
          }
        });
      }
    }

    return true
  }
}
