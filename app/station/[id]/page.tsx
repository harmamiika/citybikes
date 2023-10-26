import Link from "next/link"
import { getStationInfo } from "@/utils/database"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function StationPage({
  params,
}: {
  params: { id: number }
}) {
  const station = await getStationInfo(params.id)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{station.station_name}</CardTitle>
          <CardDescription>{station.station_address}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total journeys: {station.total_journeys}</p>
          <p>
            Average distance of a journey:{" "}
            {station.average_distance.split(".")[0]} meters
          </p>
          <p>
            Average duration of a journey:{" "}
            {(Number(station.average_duration) / 60).toFixed(0)} minutes
          </p>
        </CardContent>
      </Card>

      <Link href="/" className="underline">
        Back to stations
      </Link>
    </>
  )
}
