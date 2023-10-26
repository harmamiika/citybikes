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

export async function getStations(): Promise<IStation[]> {
  const { rows } = await pool.query("SELECT * FROM station")
  return rows
}

export async function getStationInfo(id: number): Promise<IStationInfo> {
  const { station_name, station_address } = (
    await pool.query(
      `SELECT station_name, station_address FROM station WHERE id = $1`,
      [id]
    )
  ).rows[0]

  const { total_journeys } = (
    await pool.query(
      "SELECT COUNT(*) AS total_journeys FROM journey WHERE departure_station_id = $1",
      [id]
    )
  ).rows[0]

  const { average_distance } = (
    await pool.query(
      "SELECT AVG(distance) AS average_distance FROM journey WHERE departure_station_id = $1",
      [id]
    )
  ).rows[0]

  const { average_duration } = (
    await pool.query(
      "SELECT AVG(duration) AS average_duration FROM journey WHERE departure_station_id = $1",
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
