import Banner from "@/components/Banner/Banner";
import ProductCard from "@/components/ProductCard/ProductCard";
import ServiceSection from "@/components/ServiceSection";
import img1 from "../../../public/imageBack.webp";
import img2 from "../../../public/imageFront.webp";
import titleImage from "../../../public/banner1.png";
import offerImage from "../../../public/banner2.png";
import TitleImage from "@/components/TitleImage/TitleImage";

const products = [
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
];

export default function Home() {
  return (
    <div>
      <Banner />
      <ServiceSection />
      <TitleImage
        backgroundImage={titleImage}
        title="Latest Collections"
        subtitle="24/7 services available"
        textAlign="text-center"
        ctaLink="/auth"
        ctaText="Shop Now"
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard
              key={i}
              imageFront={p.imageFront}
              imageBack={p.imageBack}
              title={p.title}
              code={p.code}
              price={p.price}
              oldPrice={p.oldPrice}
              rating={p.rating}
              reviews={p.reviews}
            />
          ))}
        </div>
      </div>
      <TitleImage
        backgroundImage={offerImage}
        title="Eid Offers for 2k26"
        subtitle="Get up to 50% off on selected items"
        textAlign="text-center"
        ctaLink="/auth"
        ctaText="Shop Now"
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
