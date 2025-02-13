import { readFileSync } from "fs";
import path = require("path");
import { AircraftResolver } from "./resolvers/aircrafts.resolver";

const aircraftResolver = new AircraftResolver();

const aircraftSchema = readFileSync(path.join(__dirname, "./schema/aircrafts.graphql"), {
    encoding: "utf-8",
});

export const typeDefs = `
    ${aircraftSchema}
`;

export const resolvers = {
    Query: {
        selectAllAircrafts: aircraftResolver.selectAllAircrafts.bind(aircraftResolver),
        selectAircraftById: aircraftResolver.selectAircraftById.bind(aircraftResolver),
    },
    Mutation: {
        createAircraft: aircraftResolver.createAircraft.bind(aircraftResolver),
        updateAircraft: aircraftResolver.updateAircraft.bind(aircraftResolver),
        deleteAircraft: aircraftResolver.deleteAircraft.bind(aircraftResolver),
    },
};