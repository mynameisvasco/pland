import { Controller, Post, Request, Response } from "nelso/build";
import { FindByLocationDto } from "./Dto/FindByLocationDto";
import { PlacesService } from "./PlacesService";

@Controller("places")
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Post("findByLocation")
  async findByLocation(req: Request, res: Response) {
    const dto = await req.body(FindByLocationDto);
    res.send(await this.placesService.findByLocation(dto));
  }

  @Post("searchLocation")
  async searchLocation(req: Request, res: Response) {
    res.send(await this.placesService.searchLocation("Universidade de Aveiro"));
  }
}
