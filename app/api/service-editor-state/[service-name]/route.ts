import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "@/db/client";

export async function GET(request: Request) {
  noStore();

  const url = new URL(request.url);
  const serviceName = url.pathname.split("/").pop(); // Extract the service name from the URL

  if (serviceName === undefined) {
    return NextResponse.json(
      { message: "Error: Service name is undefined." },
      { status: 400 }
    );
  }

  try {
    console.log(decodeURIComponent(serviceName));

    const serviceData = await prisma.service.findMany({
      select: { editor_state: true },
      where: { name: decodeURIComponent(serviceName) },
    });

    // const serviceData = await db
    //   .select({ editor_state: servicesTable.editor_state })
    //   .from(servicesTable)
    //   .where(eq(servicesTable.name, serviceName));
    return NextResponse.json(serviceData);
  } catch (error) {
    return NextResponse.json(
      { message: "Database Error: Failed to fetch service editor states." },
      { status: 500 }
    );
  }
}
