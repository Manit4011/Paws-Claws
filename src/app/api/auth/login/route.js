// login route
import { User } from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ConnectDB from "@/lib/db";

const loadDB = async () => {
    await ConnectDB();
}
loadDB();

export async function POST(request) {
    const { email, password } = await request.json();
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({
                error: "user does not exist with this email"
            },
                { status: 400 }
            );
        }
        // checking if the password is correct
        const ispasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!ispasswordCorrect) {
            return NextResponse.json({
                error: "incorrect password"
            },
                { status: 400 }
            );
        }

        // generating a token
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        const res = NextResponse.json({
            message: "user logged in successfully",
            token: token,
            user: {
                name: existingUser.name,
                email: existingUser.email,
                _id: existingUser._id
            }
        }, { status: 200 });


        // setting the token in the cookie
        res.cookies.set("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 // 1 hour
        });
        return res;

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "an error occured in logging in the user"
        },
            { status: 500 }
        );
    }
}