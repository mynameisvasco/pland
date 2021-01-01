import { Controller, Get, Post, Request, Response } from "nelso/build";
import { FindByAddressQuery } from "./Queries/FindByAddressQuery";
import { FindByLocationDto } from "./Dto/FindByLocationDto";
import { CreateDto } from "./Dto/CreateDto";
import { PlacesService } from "./PlacesService";
import { SearchAddressQuery } from "./Queries/SearchAddressQuery";
import { AuthMiddleware } from "../Common/Middleware/AuthMiddleware";
import { FindByIDQuery } from "./Queries/FindByIDQuery";

@Controller("places")
export class PlacesController {
  constructor(private placesService: PlacesService) { }

  //Pq é que nao é um get?
  @Post("findByLocation")
  async findByLocation(req: Request, res: Response) {
    const dto = await req.body(FindByLocationDto);
    res.send(await this.placesService.findByLocation(dto));
  }

  //pq é que é uma querie?
  @Get("findByAddress")
  async findByAddress(req: Request, res: Response) {
    const query = await req.queries(FindByAddressQuery);
    res.send(await this.placesService.findByAddress(query));
  }

  @Get("findLocationByAddress")
  async findLocationByAddress(req: Request, res: Response) {
    const query = await req.queries(SearchAddressQuery);
    res.send(await this.placesService.findLocationByAddress(query));
  }
  @Post("create", [AuthMiddleware])
  async create(req: Request, res: Response) {
    const dto = await req.body(CreateDto);
    console.log(dto)
    await this.placesService.create(dto);
    res.send({ message: "Location created with success" });
  }
  @Get("findByID")
  async findByID(req: Request, res: Response) {
    const query = await req.queries(FindByIDQuery)
    res.send(await this.placesService.findByID(query))
  }
}
