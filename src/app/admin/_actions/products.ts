"use server";

import { z } from "zod";
import fs from "node:fs/promises";
import db from "@/db/db";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import ProductForm from "../menuCategories/new/_components/productForm";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
);

const addSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  priceInCents: z.coerce.number().int().min(1),
  category: z
    .string()
    .min(1)
    .refine((val) => !val.startsWith("[object"), {
      message: "Invalid category format",
    }),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});
export default async function AddProduct(
  prevSatate: unknown,
  formData: FormData,
) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
      return {
        message: Object.assign({}, result.error.formErrors.fieldErrors),
      };
    }
    function createSlug(arg: string) {
      return arg
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") as string;
    }
    const slugExistiong = async (slug: string) => {
      return await db.item.findUnique({ where: { slug: slug } });
    };

    const slug = createSlug(result.data.name);
    if (await slugExistiong(slug)) {
      return { message: "name already exist" };
    }

    const data = { ...result.data, slug };
    console.log("datatatat", formData);

    await fs.mkdir("public/products", { recursive: true });
    const image = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${image}`,
      new Uint8Array(await data.image.arrayBuffer()),
    );

    await db.item.create({
      data: {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        slug: data.slug,
        typeId: data.category,
        image,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/admin/menuItems");
    revalidatePath("/products");

    return { message: "item added succefuly" };
  } catch (error) {
    console.log("3");
    return { message: error };
  }
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return { message: result.error.formErrors.fieldErrors as string };
  }

  const data = result.data;
  const item = await db.item.findUnique({ where: { id } });
  if (item == null) return notFound();

  let image = item.image;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${item.image}`);
    image = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${image}`,
      new Uint8Array(await data.image.arrayBuffer()),
    );
  }

  await db.item.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      image,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
}

const categorySchema = z.object({
  name: z.string().min(1),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});
export async function AddCategory(prevSatate: unknown, formData: FormData) {
  try {
    const result = categorySchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (result.success === false) {
      return { message: result.error.formErrors.fieldErrors };
    }

    function createSlug(arg: string) {
      return arg
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") as string;
    }

    const slug = createSlug(result.data.name);

    const data = { ...result.data, slug };

    await fs.mkdir("public/category", { recursive: true });
    const image = `/category/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${image}`,
      new Uint8Array(await data.image.arrayBuffer()),
    );

    await db.types.create({
      data: {
        name: data.name,
        slug: data.slug,
        image,
      },
    });

    revalidatePath("/");
    revalidatePath("/products");
    return { message: "item added succefuly" };
  } catch (error: any) {
    // ✅ Check if it's a unique constraint error (Prisma error code P2002)
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return {
        message: "This name already exists. Please choose a different one.",
      };
    }

    return { message: error };
  }
}

export async function toglleAvalability(
  id: string,
  isAvailableForPurchase: boolean,
) {
  await db.item.update({ where: { id }, data: { isAvailableForPurchase } });
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/menuItems");
}
export async function toglleFeaturing(
  id: string,
  isFeatured: boolean,
) {
  await db.item.update({ where: { id }, data: { featured : isFeatured } });
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/menuItems");
}
export async function DeleteMenuItem(id: string) {
  await db.item.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/menuItems");
}
export async function DeleteCategory(id: string) {
  await db.types.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/menuCategories");
}


