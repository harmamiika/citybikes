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
// add icons
// possible refactoring
// error handling?
// layout fix?
// readme and instructions

export default async function IndexPage() {
  const stations = await getStations()

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 flex-col">
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
