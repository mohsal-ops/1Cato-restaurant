// app/api/cart/get/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cartId = (await cookies()).get("cart_id")?.value;
  return NextResponse.json({ cartId: cartId || null });
}

