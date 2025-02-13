import { AircraftEntity } from "../../entities/aircraft.entity";
import { AppDataSource } from "../../database/connect";
import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields";
import { GraphQLError } from 'graphql';
import { createErrorResponse } from "../../utils/error.utils";
import { createPaginationResponse } from "../../utils/pagination.utils";

export class AircraftService {
    private readonly aircraftsModel: typeof AircraftEntity;

    constructor() {
        this.aircraftsModel = AircraftEntity;
    };

    public async selectAllAircrafts(
        limit: number,
        page: number,
        info: GraphQLResolveInfo,
        search?: string,
        filter?: string,
    ) {
        // Extract the requested fields from the query, in this case, the fields from the data object
        const topLevelFields = graphqlFields(info);
        const requestedFields = Object.keys(topLevelFields.data)

        let query = AppDataSource
            .getRepository(this.aircraftsModel)
            .createQueryBuilder("aircraft")
            .select(requestedFields.map(field => `aircraft.${field}`))
            .take(limit)
            .skip((page - 1) * limit);

        /* 
            If search is provided, this logic will be included in the query
            This search will select the records that contain the search string in the model field
         */
        if (search) {
            query = query.where(
                "(aircraft.model ->> 'ru' LIKE :search OR aircraft.model ->> 'en' LIKE :search)",
                { search: `%${search}%` }
            );
        };

        /* 
            To use the filter, the client must provide a JSON 
            string with the following format in the GraphQL query for instance:
                "filter": "{ \"manufacturer\": \"Sukhoi\", \"originated_country\"Russia\" }"
            This filter select the exact match of provided values.

            In front-end, use this code to generate the filter string:
                const filterObject = {
                    manufacturer: "Sukhoi",
                    originated_country: "Russia"
                };

                const filterString = JSON.stringify(filterObject).replace(/"/g, '\\"');
            The reuslt will be: "{ \"manufacturer\": \"Sukhoi\", \"originated_country\": \"Russia\" }"
        */
        if (filter) {
            try {
                const parsedFilter = JSON.parse(filter);

                // Loop through the parsed filter and add the where clause to the query
                Object.keys(parsedFilter).forEach((key) => {
                    if (parsedFilter[key]) {
                        query = query.andWhere(`aircraft.${key} = :${key}`, { [key]: parsedFilter[key] });
                    }
                });

                console.log("Generated SQL:", query.getQueryAndParameters()); // Debug SQL
            } catch (error) {
                console.error("Invalid filter format:", error);
            };
        };

        const [aircrafts, totalItems] = await query.getManyAndCount();
        const returnedData = createPaginationResponse(aircrafts, totalItems, page, limit);

        return {
            data: returnedData.data,
            meta: returnedData.meta
        };
    };

    public async selectAircraftById(id: string, info: GraphQLResolveInfo) {
        // Select only the requested fields from the query
        const requestedFields = Object.keys(graphqlFields(info));

        let queryBuilder = AppDataSource
            .getRepository(this.aircraftsModel)
            .createQueryBuilder('aircraft_data')
            .select(requestedFields.map(field => `aircraft_data.${field}`))
            .where("aircraft_data.aircraft_code = :id", { id });

        let query = await queryBuilder.getOne();

        if (!query) {
            throw new GraphQLError("Aircraft not found", {
                extensions: createErrorResponse(404, "Aircraft not found", "Not Found")
            });
        };

        return query;
    };

    public async createAircraft(
        data: {
            aircraft_code: string;
            model?: {
                ru: string;
                en: string;
            };
            range: number;
            manufacturer: string;
        }
    ) {
        console.log("Data:", data);
        if (!data.model || !data.model.ru || !data.model.en) {
            throw new Error("Model data is missing or incomplete.");
        };

        const { aircraft_code, model } = data;

        // Check if the aircraft already exists
        const existedAircraft = await Promise.all([
            AppDataSource
                .getRepository(this.aircraftsModel)
                .createQueryBuilder('aircraft_data')
                .where("aircraft_data.aircraft_code = :aircraft_code", { aircraft_code })
                .getOne(),

            AppDataSource
                .getRepository(this.aircraftsModel)
                .createQueryBuilder('aircraft_data')
                .where("aircraft_data.model ->> 'ru' = :ru OR aircraft_data.model ->> 'en' = :en", {
                    ru: model.ru,
                    en: model.en
                })
                .getOne(),
        ]);

        // If any exist, throw an error
        if (existedAircraft.some(Boolean)) {
            throw new GraphQLError("Aircraft already exists", {
                extensions: createErrorResponse(409, "Aircraft already exists", "Conflict")
            });
        };

        return await AppDataSource
            .getRepository(this.aircraftsModel)
            .save(data);
    };

    public async updateAircraft(
        data: {
            aircraft_code: string;
            model?: {
                ru: string;
                en: string;
            };
            range?: number;
            manufacturer?: string;
        }
    ) {
        const { aircraft_code } = data;

        const existedAircraft = await
            AppDataSource
                .getRepository(this.aircraftsModel)
                .createQueryBuilder('aircraft_data')
                .where("aircraft_data.aircraft_code = :aircraft_code", { aircraft_code })
                .getOne();

        if (!existedAircraft) {
            throw new GraphQLError("Aircraft not found", {
                extensions: createErrorResponse(404, "Aircraft not found", "Not Found")
            });
        };

        return await AppDataSource
            .getRepository(this.aircraftsModel)
            .update(
                {aircraft_code: data.aircraft_code}, 
                { model: data.model, range: data.range, manufacturer: data.manufacturer }
            );
    };

    public async deleteAircraft(id: string) {
        const existedAircraft = await
            AppDataSource
                .getRepository(this.aircraftsModel)
                .createQueryBuilder('aircraft_data')
                .where("aircraft_data.aircraft_code = :aircraft_code", { aircraft_code: id })
                .getOne();

        if (!existedAircraft) {
            throw new GraphQLError("Aircraft not found", {
                extensions: createErrorResponse(404, "Aircraft not found", "Not Found")
            });
        };

        await AppDataSource
            .getRepository(this.aircraftsModel)
            .delete({ aircraft_code: id });

        return { message: `Aircraft ${id} deleted successfully` };
    };
};