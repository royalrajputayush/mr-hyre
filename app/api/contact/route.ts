import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    // 1. Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "All fields (first name, last name, email, message) are required." },
        { status: 400 }
      );
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // 3. Send email
    const success = await sendContactFormEmail(firstName, lastName, email, message);

    if (success) {
      return NextResponse.json(
        { message: "Your message has been sent successfully. We will get back to you shortly!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send message. Please try again later or email us directly at support@mrhyre.ai." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
