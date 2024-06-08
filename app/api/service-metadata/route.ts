import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "@/db/client";

export async function GET(request: Request) {
  noStore();

  try {
    const serviceMetaData = await prisma.service.findMany({
      select: { name: true, slug: true },
    });
    return NextResponse.json(serviceMetaData);
  } catch (error) {
    return NextResponse.json(
      { message: "Database Error: Failed to fetch service metadata." },
      { status: 500 }
    );
  }
}
