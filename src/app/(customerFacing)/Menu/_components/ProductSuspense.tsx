import { Item } from "@prisma/client";
import ProductCard from "../../_components/ProductCard";

type ProductFetcherProp = {
    products: Item[] | undefined
};

export function ProductSuspense({ products }: ProductFetcherProp) {

    return products?.map((product: Item) => (
        <ProductCard key={product.id} {...product} />
    ));
}