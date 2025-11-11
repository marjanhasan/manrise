import { AllProducts } from "@/types/product";
import ProductCard from "../ProductCard/ProductCard";

// --- Component -------------------------------------------------------------

export default function RelatedProducts({
  products,
}: {
  products: AllProducts[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.productId}
          productId={p.sku} // keep product id for routing; use color in title
          images={{ front: p.images[0], back: p.images[1] || p.images[0] }} // expects { front: UiImage; back: UiImage }
          title={`${p.title} — ${p.color}`}
          code={p.code}
          price={p.price}
          compareAtPrice={p.compareAtPrice}
          rating={p.rating}
          reviewCount={p.reviewCount}
        />
      ))}
    </div>
  );
}
