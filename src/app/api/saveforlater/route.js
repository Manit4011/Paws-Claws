import { NextResponse } from "next/server";
import ConnectDB from "@/lib/db";
import { Savedpet } from "@/lib/models/petschema";

export async function POST(req) {
  await ConnectDB(); 

  try {
    const {
      petName,
      gender,
      location,
      ownerName,
      postedOn,
      age,
      imageUrl,
      adoptionLink,
      userid
    } = await req.json();

    if (!petName || !gender || !location || !ownerName) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const pet = await Savedpet.create({
      petName,
      gender,
      location,
      ownerName,
      postedOn,
      age,
      imageUrl,
      adoptionLink,
      userid
    });

    return NextResponse.json({ message: "Pet saved successfully", pet });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
