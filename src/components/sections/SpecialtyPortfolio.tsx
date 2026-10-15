import ProductShowcase from "@/components/sections/ProductShowcase";
import { CURRENT_PRODUCTS } from "@/lib/products";

export default function SpecialtyPortfolio({ showPortfolioLink = true }: { showPortfolioLink?: boolean }) {
  const products = CURRENT_PRODUCTS.filter((product) => product.categoryId !== "azagro-ec");
  return (
    <ProductShowcase
      products={products}
      id="specialty-products"
      title="Botanical oils, biostimulants and specialist inputs."
      description="Explore the portfolio, from Cold-Pressed Neem Oil and Karanja Oil to NitroRich, granules and technical powder."
      categoryAnchors
      showAllProductsLink={showPortfolioLink}
    />
  );
}
