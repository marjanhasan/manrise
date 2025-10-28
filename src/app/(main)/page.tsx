import Banner from "@/components/Banner/Banner";
import ProductCard from "@/components/ProductCard/ProductCard";
import ServiceSection from "@/components/ServiceSection";
import img1 from "../../../public/imageBack.webp";
import img2 from "../../../public/imageFront.webp";
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
];
export default function Home() {
  return (
    <div>
      <Banner />
      <ServiceSection />
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
