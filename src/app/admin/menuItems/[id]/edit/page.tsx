import db from "@/db/db"
import ProductForm from "../../new/_components/productForm"
import { Item } from "@prisma/client"

export default async function Edit ({
  params:{id}
}:{
  params:{id : string}
}){
  const item = await db.item.findUnique({where:{id}})
  return (
    <>
    <div className="flex flex-col gap-3 md:ml-44">
      <p className=" text-3xl "> Edit Product </p>
      <ProductForm item={item } types={[]}/>
    </div>
    </>
  )
}