import PageHeader from "../../_components/pageHeader";
import ProductForm from "./_components/productForm";
import getAllTypes from "@/app/admin/menuCategories/_action/gettypes";

export default function Page({searchParams}:{ searchParams:{productId?: string |undefined}}) {

  return (
    <div className="px-3 ">
      <ProductForm productId={searchParams?.productId} />
    </div>
  );
}
