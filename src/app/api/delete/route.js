import { NextResponse } from "next/server";
import ConnectDB from "@/lib/db";
import { Savedpet } from "@/lib/models/petschema";

export async function POST(req) {
  await ConnectDB();

  try {
    const { userid, petId } = await req.json();

    if (!userid || !petId) {
      return NextResponse.json({ error: "userid and petId are required" }, { status: 400 });
    }

    // 🧹 Delete where both userId and petId match
    const deleted = await Savedpet.findOneAndDelete({ _id: petId, userid });

    if (!deleted) {
      return NextResponse.json({ message: "No matching saved pet found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Pet deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
