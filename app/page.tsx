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

// todos:
// add icons / make table links more link-like
// possible refactoring
// error handling?
// layout fix?
// readme and instructions

export default async function IndexPage() {
  const stations = await getStations()

  return (
    <section className="gap-6 pb-8 pt-6">
      <h1 className="text-4xl font-bold">Stations</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stations.map((station) => (
            <TableRow>
              <TableCell className="font-medium">
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
