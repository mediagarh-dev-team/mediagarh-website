import MainHome from "@/components/Home/MainHome";
import { generateSEO } from "@/_helper/seo";

export const metadata = generateSEO({
  title: "",
  description: "",
  keywords: "",
  image: "/images/home/",
  path: "/",
  index: true,
});

export default function HomePage() {
  return <MainHome />;
}
