import { connect } from "@/database/config";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
  
    const user = await User.findOne({email});
    if(!user) {
      return NextResponse.json({
        message: "User does not exist",
      }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if(!validPassword) {
      return NextResponse.json({
        message: "Incorrect email/password combination"
      }, { status: 400 });
    }

    // create token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}
