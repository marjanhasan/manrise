import Banner from "@/components/Banner/Banner";
import ServiceSection from "@/components/ServiceSection";
import titleImage from "../../../public/banner1.png";
import offerImage from "../../../public/banner2.png";
import TitleImage from "@/components/TitleImage/TitleImage";
import { ALL_PRODUCTS } from "@/data/dummy";
import RelatedProducts from "@/components/ui/RelatedProducts";

export default function Home() {
  const latestProducts = ALL_PRODUCTS.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  ).slice(0, 4);
  return (
    <div>
      <Banner />
      <ServiceSection />
      <TitleImage
        backgroundImage={titleImage}
        title="Latest Collections"
        subtitle="24/7 services available"
        textAlign="text-center"
        ctaLink="/collections"
        ctaText="Shop Now"
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <RelatedProducts products={latestProducts} />
      </div>
      <TitleImage
        backgroundImage={offerImage}
        title="Eid Offers for 2k26"
        subtitle="Get up to 50% off on selected items"
        textAlign="text-center"
        ctaLink="/collections"
        ctaText="Shop Now"
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <RelatedProducts
          products={ALL_PRODUCTS.filter((p) => p.bestSeller).slice(0, 4)}
        />
      </div>
    </div>
  );
}
