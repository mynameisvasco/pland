import { Controller, Get, Post, Request, Response } from "nelso/build";
import { FindByAddressDto } from "./Dto/FindByAddressDto";
import { FindByLocationDto } from "./Dto/FindByLocationDto";
import { PlacesService } from "./PlacesService";
import { SearchAddressQuery } from "./Queries/SearchAddressQuery";

@Controller("places")
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Post("findByLocation")
  async findByLocation(req: Request, res: Response) {
    const dto = await req.body(FindByLocationDto);
    res.send(await this.placesService.findByLocation(dto));
  }

  @Get("findByAddress")
  async findByAddress(req: Request, res: Response) {
    const dto = await req.queries(FindByAddressDto);
    res.send(await this.placesService.findByAddress(dto));
  }

  @Get("findLocationByAddress")
  async findLocationByAddress(req: Request, res: Response) {
    const queries = await req.queries(SearchAddressQuery);
    res.send(await this.placesService.findLocationByAddress(queries));
  }
}
