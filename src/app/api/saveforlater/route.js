import { NextResponse } from "next/server";
import ConnectDB from "@/lib/db";
import { Savedpet } from "@/lib/models/petschema";

// Make sure you're using the correct runtime
export const dynamic = "force-dynamic";

// POST /api/saved-pets => save a pet for a user
export async function POST(req) {
  await ConnectDB();

  try {
    const body = await req.json();
    const {
      petName,
      gender,
      location,
      ownerName,
      postedOn,
      age,
      imageUrl,
      adoptionLink,
      userid,
    } = body;

    if (!petName || !gender || !location || !ownerName || !userid) {
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
      userid,
    });

    return NextResponse.json(
      { message: "Pet saved successfully", pet },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await ConnectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const savedPets = await Savedpet.find({ userid: userId });
    return NextResponse.json(savedPets, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
