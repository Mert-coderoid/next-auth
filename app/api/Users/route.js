import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        const userData = body.formData;

        if (!userData || !userData.email || !userData.name || !userData.password) {
            return NextResponse.json({ message: "Please provide all fields" }, { status: 400 });
        }

        const duplicate = await User.findOne({ email: userData.email }).lean().exec();

        if (duplicate) {
            return NextResponse.json({ message: "Duplicate email" }, { status: 409 });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userData.password, salt);

        userData.password = hash;
        await User.create(userData);
        return NextResponse.json({ message: "User created" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
    }
}
