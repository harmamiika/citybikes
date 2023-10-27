import Link from "next/link"
import { getStations } from "@/utils/database"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function IndexPage() {
  const stations = await getStations()

  return (
    <section className="gap-4">
      <h1 className="text-4xl font-bold pb-2">Stations</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stations.map((station) => (
            <TableRow key={station.id}>
              <TableCell className="font-medium hover:underline">
                <Link href={`/station/${station.id}`}>
                  {station.station_name}
                </Link>
              </TableCell>
              <TableCell>{station.station_address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
