import { Entity, Column, PrimaryColumn } from "typeorm";

interface AircraftModel {
    en: string
    ru: string
};

@Entity({
    name: "aircrafts_data",
})
export class AircraftEntity {
    @PrimaryColumn("varchar", { length: 3 })
    aircraft_code!: string;

    @Column("jsonb")
    model!: AircraftModel;

    @Column("int")
    range!: number;

    @Column("character", { length: 20 })
    manufacturer!: string;
};
