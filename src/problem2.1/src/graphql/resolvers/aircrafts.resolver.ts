import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { AircraftService } from "../services/aircraft.service";

export class AircraftResolver {
    private aircraftService: AircraftService;

    constructor() {
        this.aircraftService = new AircraftService();
    };

    public async selectAllAircrafts(
        _: any,
        args: { limit: number; page: number; search?: string, filter?: string },
        context: any,
        info: GraphQLResolveInfo
    ) {
        const allAircraftsPaginated = await this.aircraftService.selectAllAircrafts(
            args.limit,
            args.page,
            info,
            args.search,
            args.filter,
        );

        console.log(allAircraftsPaginated);

        return allAircraftsPaginated;
    };

    public async selectAircraftById(
        _: any,
        args: { id: string },
        context: any,
        info: GraphQLResolveInfo
    ) {
        return await this.aircraftService.selectAircraftById(args.id, info);
    };

    public async createAircraft(
        _: any,
        args: {
            input: {
                aircraft_code: string
                model: {

                    ru: string;
                    en: string;
                }
                range: number
                manufacturer: string
            }
        },
    ) {
        try {
            return await this.aircraftService.createAircraft(args.input);
        } catch (error: any) {
            throw new GraphQLError(error.message, {
                extensions: error.extensions || {
                    statusCode: 500,
                    message: "Internal Server Error",
                    error: "Server Error",
                    timestamp: new Date().toISOString(),
                },
            });
        };
    };

    public async updateAircraft(
        _: any,
        args: {
            input: {
                aircraft_code: string
                model?: {

                    ru: string;
                    en: string;
                }
                range?: number
                manufacturer?: string
            }
        },
    ) {
        try {
            return await this.aircraftService.updateAircraft(args.input);
        } catch (error: any) {
            throw new GraphQLError(error.message, {
                extensions: error.extensions || {
                    statusCode: 500,
                    message: "Internal Server Error",
                    error: "Server Error",
                    timestamp: new Date().toISOString(),
                },
            });
        };
    };

    public async deleteAircraft(
        _: any,
        args: { id: string },
    ) {
        try {
            return await this.aircraftService.deleteAircraft(args.id);
        } catch (error: any) {
            throw new GraphQLError(error.message, {
                extensions: error.extensions || {
                    statusCode: 500,
                    message: "Internal Server Error",
                    error: "Server Error",
                    timestamp: new Date().toISOString(),
                },
            });
        };
    };
};