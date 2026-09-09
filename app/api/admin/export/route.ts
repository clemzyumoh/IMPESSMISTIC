//  import { NextRequest, NextResponse } from "next/server";
//  import { supabaseServer } from "@/lib/supabase";

// // function toCsvValue(v: unknown): string {
// //   if (v === null || v === undefined) return "";
// //   const s = Array.isArray(v) ? v.join("; ") : String(v);
// //   if (s.includes(",") || s.includes('"') || s.includes("\n")) {
// //     return `"${s.replace(/"/g, '""')}"`;
// //   }
// //   return s;
// // }
// const supabase = supabaseServer();
// const status = req.nextUrl.searchParams.get("status");
// const id = req.nextUrl.searchParams.get("id");

// let query = supabase
//   .from("leads")
//   .select("*")
//   .order("created_at", { ascending: false });

// if (id) {
//   query = query.eq("id", id);
// } else if (status && status !== "all") {
//   query = query.eq("status", status);
// }
// export async function GET(req: NextRequest) {
//   const supabase = supabaseServer();
//   const status = req.nextUrl.searchParams.get("status");

//   let query = supabase
//     .from("leads")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (status && status !== "all") {
//     query = query.eq("status", status);
//   }

//   const { data, error } = await query;

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   const rows = data ?? [];
//   const columns =
//     rows.length > 0
//       ? Object.keys(rows[0])
//       : [
//           "id",
//           "created_at",
//           "full_name",
//           "phone",
//           "email",
//           "property_address",
//         ];

//   const csv = [
//     columns.join(","),
//     ...rows.map((row) =>
//       columns.map((c) => toCsvValue((row as Record<string, unknown>)[c])).join(",")
//     ),
//   ].join("\n");
// const filename = id
//   ? `lead-${rows[0]?.full_name?.toString().replace(/\s+/g, "-") || id}.csv`
//   : "leads-export.csv";

// return new NextResponse(csv, {
//   headers: {
//     "Content-Type": "text/csv",
//     "Content-Disposition": `attachment; filename="${filename}"`,
//   },
// });
//   // return new NextResponse(csv, {
//   //   headers: {
//   //     "Content-Type": "text/csv",
//   //     "Content-Disposition": `attachment; filename="leads-export.csv"`,
//   //   },
//   // });
// }

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

function toCsvValue(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = Array.isArray(v) ? v.join("; ") : String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(req: NextRequest) {
  const supabase = supabaseServer();
  const status = req.nextUrl.searchParams.get("status");
  const id = req.nextUrl.searchParams.get("id");

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (id) {
    query = query.eq("id", id);
  } else if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = data ?? [];
  const columns =
    rows.length > 0
      ? Object.keys(rows[0])
      : ["id", "created_at", "full_name", "phone", "email", "property_address"];

  const csv = [
    columns.join(","),
    ...rows.map((row) =>
      columns
        .map((c) => toCsvValue((row as Record<string, unknown>)[c]))
        .join(","),
    ),
  ].join("\n");

  const filename = id
    ? `lead-${rows[0]?.full_name?.toString().replace(/\s+/g, "-") || id}.csv`
    : "leads-export.csv";

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}