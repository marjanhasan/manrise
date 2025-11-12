import { AllProducts } from "@/types/product";
import ProductCard from "../ProductCard/ProductCard";

interface RelatedProductsProps {
  products: AllProducts[];
  children?: React.ReactNode; // allows skeletons or sentinels
}

export default function RelatedProducts({
  products,
  children,
}: RelatedProductsProps) {
  return (
    <div
      aria-label="Products"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4"
    >
      {products.map((p) => (
        <ProductCard
          key={p.productId}
          productId={p.sku} // ✅ SKU is unique per color
          images={{
            front: p.images[0],
            back: p.images[1] || p.images[0],
          }}
          title={p.title}
          code={p.code}
          price={p.price}
          compareAtPrice={p.compareAtPrice}
          rating={p.rating}
          reviewCount={p.reviewCount}
        />
      ))}

      {children}
    </div>
  );
}
