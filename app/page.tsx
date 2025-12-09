import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { ProgramsGrid } from "@/components/programs-grid";
import { LatestNews } from "@/components/latest-news";
import { PartnersRow } from "@/components/partners-row";
import { GalleryPreview } from "@/components/gallery-preview";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ProgramsGrid />
      <GalleryPreview />
      <LatestNews />
      <PartnersRow />
    </>
  );
}
