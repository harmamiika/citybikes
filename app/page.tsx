import Link from "next/link"
import { Pool } from "pg"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const pool = new Pool({
  user: "academy",
  host: "localhost",
  database: "citybike",
  password: "academy",
  port: 5432,
})

interface IStation {
  id: number
  station_name: string
  station_address: string
  coordinate_x: string
  coordinate_y: string
}

// todos:
// single page view with link
// cleanup header
// add icons

export default async function IndexPage() {
  const result = await pool.query("SELECT * FROM station")
  const stations = result.rows as IStation[]

  console.log(stations[0])

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
