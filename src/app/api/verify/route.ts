import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, payment_id, order_id, signature } = body;

    if (!email || email.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Missing email address" },
        { status: 400 }
      );
    }

    if (!payment_id) {
      const order = await razorpay.orders.create({
        amount: 49900,
        currency: "INR",
        receipt: `receipt_order_${Math.random()}`,
      });
      return NextResponse.json({ order });
    }

    // Verify payment signature
    const sign = order_id + "|" + payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(sign)
      .digest("hex");

    if (expectedSign !== signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const downloadLink = process.env.DOWNLOAD_LINK!;
    const mailOptions = {
      from: `"Your Store" <${process.env.EMAIL_USER!}>`,
      to: email,
      subject: "Your Digital Product Download Link",
      text: `Hi ${name},\n\nThank you for your purchase!\n\nDownload your product here: ${downloadLink}\n\nEnjoy!`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, downloadLink });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
