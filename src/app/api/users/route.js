import ConnectDB from "@/lib/db"
import { User } from "@/lib/models/userModel"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const loadDB = async () => {
  await ConnectDB()
}
loadDB()

export async function GET(request) {
  // fetch all users from the database
  let users = []
  try {
    users = await User.find() //getting all users into an array
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching users",
      status: "error",
      error: error.message
    })
  }
  return NextResponse.json(users)
}


//creating a new user(sign up page)
export async function POST(request) {
  const { name, email, password, about, profileUrl } = await request.json();

  try {
    // Check if a user with the same name or email already exists
    const existingUser = await User.findOne({
      $or: [{ name }, { email }]
    });

    if (existingUser) {
      return NextResponse.json({
        message: "Username or email already exists",
        status: "error"
      }, { status: 409 }); // 409 = Conflict
    }

    const newUser = new User({
      name,
      email,
      password,
      about,
      profileUrl
    });

    newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.BCRYPT_SALT));

    await newUser.save();

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
