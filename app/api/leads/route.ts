import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["full_name", "phone", "email", "property_address"];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          full_name: body.full_name,
          phone: body.phone,
          email: body.email,
          property_address: body.property_address,
          city: body.city ?? null,
          state: body.state ?? null,
          zip: body.zip ?? null,
          property_type: body.property_type ?? null,
          bedrooms: body.bedrooms ?? null,
          bathrooms: body.bathrooms ?? null,
          approx_square_footage: body.approx_square_footage ?? null,
          year_built: body.year_built ?? null,
          ownership_status: body.ownership_status ?? null,
          has_mortgage: body.has_mortgage ?? null,
          mortgage_balance: body.mortgage_balance ?? null,
          is_occupied: body.is_occupied ?? null,
          occupant_type: body.occupant_type ?? null,
          condition: body.condition ?? null,
          reason_for_selling: body.reason_for_selling ?? null,
          timeline: body.timeline ?? null,
          photo_urls: body.photo_urls ?? [],
          additional_notes: body.additional_notes ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    // Notify the business owner. Don't fail the request if email fails —
    // the lead is already safely in the database either way.
    const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL;
    if (notifyTo && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "leads@impessmistic.com",
          to: notifyTo,
          subject: `New lead: ${body.full_name} — ${body.property_address}`,
          text: [
            `New property lead submitted.`,
            ``,
            `Name: ${body.full_name}`,
            `Phone: ${body.phone}`,
            `Email: ${body.email}`,
            `Property: ${body.property_address}, ${body.city ?? ""} ${body.state ?? ""} ${body.zip ?? ""}`,
            `Condition: ${body.condition ?? "n/a"}`,
            `Reason for selling: ${body.reason_for_selling ?? "n/a"}`,
            `Timeline: ${body.timeline ?? "n/a"}`,
            ``,
            `View full details in the admin dashboard.`,
          ].join("\n"),
        });
      } catch (emailErr) {
        console.error("Resend email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
