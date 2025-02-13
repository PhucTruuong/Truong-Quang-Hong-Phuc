import express from "express";
import AircraftRoutes from "./api/aircraft.route";

export function route(app: express.Express) {
  app.use("/api/aircraft", AircraftRoutes);
};
