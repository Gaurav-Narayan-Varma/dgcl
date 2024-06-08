import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/db/client";

export async function fetchPost() {
  noStore();
}

export async function fetchServiceHtml(serviceSlug: string) {
  noStore();

  try {
    const service = await prisma.service.findFirst({
      where: { slug: serviceSlug },
      select: { html: true },
    });
    return service?.html;
  } catch (error) {
    return {
      message: "Database Error: Failed to fetch post",
    };
  }
}

export async function fetchServiceCardData() {
  noStore();

  try {
    const serviceCards = await prisma.service.findMany({
      select: { card_title: true, card_description: true },
    });
    return serviceCards;
  } catch (error) {
    return {
      message: "Database Error: Failed to fetch post",
    };
  }
}
