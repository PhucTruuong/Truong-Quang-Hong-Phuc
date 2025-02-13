-- Table: aircrafts_data

-- DROP TABLE IF EXISTS aircrafts_data;

CREATE TABLE IF NOT EXISTS aircrafts_data
(
    aircraft_code character(3) COLLATE pg_catalog."default" NOT NULL,
    model jsonb NOT NULL,
    range integer NOT NULL,
    manufacturer character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT aircrafts_pkey PRIMARY KEY (aircraft_code),
    CONSTRAINT aircrafts_range_check CHECK (range > 0)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS aircrafts_data
    OWNER to postgres;

COMMENT ON TABLE aircrafts_data
    IS 'Aircrafts (internal data)';

COMMENT ON COLUMN aircrafts_data.aircraft_code
    IS 'Aircraft code, IATA';

COMMENT ON COLUMN aircrafts_data.model
    IS 'Aircraft model';

COMMENT ON COLUMN aircrafts_data.range
    IS 'Maximal flying distance, km';