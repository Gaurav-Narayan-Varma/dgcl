import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchServiceCardData } from "@/lib/data";

export default async function Overview() {
  const serviceCards = await fetchServiceCardData();

  if (
    !serviceCards ||
    !Array.isArray(serviceCards) ||
    serviceCards.length === 0
  ) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div>
      {serviceCards.map((card, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{card.card_title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{card.card_description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
