import { AircraftService } from "../services/aircraft.service";
import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse, sendSuccessResponseWithMessage } from "../utils/success-response.utils";
import HttpStatusCodes from "../constants/HttpStatusCode";

class AircraftController {
    private aircraftService: AircraftService;

    constructor() {
        this.aircraftService = new AircraftService();
        this.createAircraft = this.createAircraft.bind(this);
        this.selectAllAircrafts = this.selectAllAircrafts.bind(this);
        this.selectAircraftById = this.selectAircraftById.bind(this);
        this.updateAircraft = this.updateAircraft.bind(this);
        this.deleteAircraft = this.deleteAircraft.bind(this);
    };

    public async createAircraft(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const aircraft = await this.aircraftService.createAircraft(req.body);
            return sendSuccessResponse(res, HttpStatusCodes.OK, aircraft);
        } catch (error) {
            next(error);
        };
    };

    public async selectAllAircrafts(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string | undefined;
            const filter = req.query.filter as string | undefined;

            console.log(limit, page, search, filter);

            const aircrafts = await this.aircraftService.selectAllAircrafts(limit, page, search, filter);
            return sendSuccessResponse(res, HttpStatusCodes.OK, aircrafts);
        } catch (error) {
            next(error);
        };
    };

    public async selectAircraftById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const aircraftId = req.params.id;
            const aircraft = await this.aircraftService.selectAircraftById(aircraftId);
            return sendSuccessResponse(res, HttpStatusCodes.OK, aircraft);
        } catch (error) {
            next(error);
        };
    };

    public async updateAircraft(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const aircraft = await this.aircraftService.updateAircraft(req.body);
            return sendSuccessResponseWithMessage(res, HttpStatusCodes.OK, "Aircraft updated successfully!");
        } catch (error) {
            next(error);
        };
    };

    public async deleteAircraft(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            await this.aircraftService.deleteAircraft(req.params.id);
            return sendSuccessResponseWithMessage(res, HttpStatusCodes.OK, "Aircraft deleted successfully!");
        } catch (error) {
            next(error);
        };
    };
};

const aircraftController = new AircraftController();
export default aircraftController;