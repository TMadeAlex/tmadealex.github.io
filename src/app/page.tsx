import HomeView from "@/views/HomeView";
import { languageMetadata } from "@/lib/share";

export const metadata = languageMetadata("en", "/");

/* The front page in English. Its Spanish twin is src/app/es/page.tsx; both draw src/views/HomeView.tsx. */
export default function HomePage() {
  return <HomeView locale="en" />;
}
