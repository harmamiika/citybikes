import { Pool } from "pg"

export interface IStation {
  id: number
  station_name: string
  station_address: string
  coordinate_x: string
  coordinate_y: string
}

export interface IStationInfo {
  station_name: string
  station_address: string
  total_journeys: string
  average_distance: string
  average_duration: string
}

const pool = new Pool({
  user: "academy",
  host: "localhost",
  database: "citybike",
  password: "academy",
  port: 5432,
})

export const getStations = async (): Promise<IStation[]> =>
  (await pool.query("SELECT * FROM station")).rows

export const getStationInfo = async (id: number): Promise<IStationInfo> => {
  const {
    station_name,
    station_address,
    total_journeys,
    average_distance,
    average_duration,
  } = (
    await pool.query(
      `
  SELECT
    s.station_name,
    s.station_address,
    COUNT(j.id) AS total_journeys,
    AVG(j.distance) AS average_distance,
    AVG(j.duration) AS average_duration
  FROM station AS s
  LEFT JOIN journey AS j ON s.id = j.departure_station_id
  WHERE s.id = $1
  GROUP BY s.station_name, s.station_address;
`,
      [id]
    )
  ).rows[0]

  return {
    station_name,
    station_address,
    total_journeys,
    average_distance,
    average_duration,
  }
}
