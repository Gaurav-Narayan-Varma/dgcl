import { unstable_noStore as noStore } from "next/cache";
// import { db } from "@/db/db";
// import { servicesTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // const serviceData = await db
    //   .select({ slug: servicesTable.slug })
    //   .from(servicesTable);
    return NextResponse.json("serviceData");
  } catch (error) {
    return NextResponse.json(
      { message: "Database Error: Failed to fetch service names." },
      { status: 500 }
    );
  }
}
