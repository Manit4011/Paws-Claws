import ConnectDB from "@/lib/db"
import { User } from "@/lib/models/userModel"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const loadDB = async () => {
  await ConnectDB()
}
loadDB()


//creating a new user(sign up page)
export async function POST(request) {
  try {
    const { name, email, password, about, profileUrl } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({
        error: "please fill all the fields"
      },
        { status: 400 }
      );
    }

    const user = new User({
      name,
      email,
      password,
      about,
      profileUrl
    });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        error: "user already exists with this email"
      },
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT));

    await user.save();

    return NextResponse.json({
      message: "User Created",
      status: "success"
    });

  } catch (error) {
    return NextResponse.json({
      message: "User not created",
      status: "error",
      error: error.message
    }, { status: 500 });
  }
}
