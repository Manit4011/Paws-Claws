import { NextResponse } from "next/server";
import ConnectDB from "@/lib/db";
import { Savedpet } from "@/models/savedpet";

await ConnectDB();

export async function POST(req) {
  try {
    const {
      petName,
      gender,
      location,
      ownerName,
      postedOn,
      age,
      imageUrl,
      adoptionLink
    } = await req.json();

    if (!petName || !gender || !location || !ownerName) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const pet = await Savedpet.create({
      petname: petName,
      gender,
      location,
      owner: ownerName,
      postedOn,
      age,
      imageUrl,
      adoptionLink
    });

    return NextResponse.json({ message: "Pet saved successfully", pet });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
