import MainHome from "@/components/Home/MainHome";
import { generateSEO } from "@/_helper/seo";

export const metadata = generateSEO({
  title: "Best Education Marketing Company In India | Mediagarh",
  description: "Best Education Marketing Company in India, digital marketing. Admission marketing, reputation management, PR agency for schools, colleges, and coaching centers.",
  keywords: "",
  image: "/images/home/",
  path: "/",
  index: true,
});

export default function HomePage() {
  return <MainHome />;
}
