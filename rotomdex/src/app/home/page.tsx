// app/page.tsx
import HomePageClient from "@/components/HomePageClient";
import { getRandomTeam } from "@/utils/getRandomTeam";

export default async function HomePage() {
    const data = await getRandomTeam();
    return <HomePageClient initialData={data} />;
}