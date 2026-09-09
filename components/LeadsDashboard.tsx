"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Lead = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  property_address: string;
  city: string | null;
  state: string | null;
  zip: string | null;
  property_type: string | null;
  bedrooms: string | null;
  bathrooms: string | null;
  approx_square_footage: string | null;
  year_built: string | null;
  ownership_status: string | null;
  has_mortgage: boolean | null;
  mortgage_balance: string | null;
  is_occupied: boolean | null;
  occupant_type: string | null;
  condition: string | null;
  reason_for_selling: string | null;
  timeline: string | null;
  photo_urls: string[] | null;
  additional_notes: string | null;
  status: string;
  internal_notes: string | null;
};

const STATUSES = ["new", "contacted", "offer_made", "closed", "dead"] as const;

function statusLabel(s: string) {
  return s
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export default function LeadsDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [notesDraft, setNotesDraft] = useState("");

  async function loadLeads() {
    setLoading(true);
    const res = await fetch("/api/admin/leads");
    if (res.ok) {
      const body = await res.json();
      setLeads(body.leads ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    setNotesDraft(selected?.internal_notes ?? "");
  }, [selected]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = `${l.full_name} ${l.property_address} ${l.phone} ${l.email}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, statusFilter, search]);

  const stats = useMemo(() => {
    const total = leads.length;
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const newThisWeek = leads.filter(
      (l) => new Date(l.created_at).getTime() > weekAgo
    ).length;
    const closed = leads.filter((l) => l.status === "closed").length;
    return { total, newThisWeek, closed };
  }, [leads]);

  async function updateLead(id: string, patch: Partial<Lead>) {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      const body = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === id ? body.lead : l)));
      setSelected((s) => (s && s.id === id ? body.lead : s));
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="wordmark text-4xl">Leads Dashboard</h1>
        <button
          onClick={handleLogout}
          className="border border-ink px-4 py-2 text-xs uppercase tracking-wide hover:bg-ink hover:text-paper">
          Log out
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-px border border-ink bg-ink">
        <div className="bg-paper p-4">
          <div className="wordmark text-3xl">{stats.total}</div>
          <div className="text-xs uppercase tracking-wide text-grey">
            Total leads
          </div>
        </div>
        <div className="bg-paper p-4">
          <div className="wordmark text-3xl">{stats.newThisWeek}</div>
          <div className="text-xs uppercase tracking-wide text-grey">
            New this week
          </div>
        </div>
        <div className="bg-paper p-4">
          <div className="wordmark text-3xl">{stats.closed}</div>
          <div className="text-xs uppercase tracking-wide text-grey">
            Closed
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <input
          placeholder="Search name, address, phone, email"
          className="flex-1 min-w-[220px] border border-ink bg-paper px-3 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-ink bg-paper px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
          ))}
        </select>
        <a
          href={`/api/admin/export${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`}
          className="border border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-paper">
          Export CSV
        </a>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto border border-ink">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-ink text-left uppercase text-xs tracking-wide text-grey">
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Phone</th>
              <th className="px-3 py-3">Property</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Export</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-grey">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-grey">
                  No leads match.
                </td>
              </tr>
            )}
            {filtered.map((l) => (
              <tr
                key={l.id}
                className="cursor-pointer border-b border-ink last:border-b-0 hover:bg-grey-light"
                onClick={() => setSelected(l)}>
                <td className="px-3 py-3 text-grey">
                  {new Date(l.created_at).toLocaleDateString()}
                </td>
                <td className="px-3 py-3 font-bold">{l.full_name}</td>
                <td className="px-3 py-3">{l.phone}</td>
                <td className="px-3 py-3">{l.property_address}</td>
                <td className="px-3 py-3">{statusLabel(l.status)}</td>
                
<td className="px-3 py-3">
  <a
  
    href={`/api/admin/export?id=${l.id}`}
    onClick={(e) => e.stopPropagation()}
    className="underline hover:opacity-60"
  >
    CSV
  </a>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/40">
          <div className="h-full w-full max-w-lg overflow-y-auto border-l border-ink bg-paper p-6">
            <div className="flex items-center justify-between">
              <h2 className="wordmark text-2xl">{selected.full_name}</h2>
              <button
                onClick={() => setSelected(null)}
                className="border border-ink px-3 py-1 text-xs hover:bg-ink hover:text-paper">
                Close
              </button>
              <a
  href={`/api/admin/export?id=${selected.id}`}
  className="border border-ink px-3 py-1 text-xs hover:bg-ink hover:text-paper"
>
  Export
</a>
            </div>

            <div className="mt-6 space-y-1 text-sm">
              <div>
                <span className="text-grey">Phone:</span> {selected.phone}
              </div>
              <div>
                <span className="text-grey">Email:</span> {selected.email}
              </div>
              <div>
                <span className="text-grey">Address:</span>{" "}
                {selected.property_address}, {selected.city} {selected.state}{" "}
                {selected.zip}
              </div>
              <div>
                <span className="text-grey">Type:</span>{" "}
                {selected.property_type || "—"}
              </div>
              <div>
                <span className="text-grey">Beds/Baths:</span>{" "}
                {selected.bedrooms || "—"} / {selected.bathrooms || "—"}
              </div>
              <div>
                <span className="text-grey">Sq ft:</span>{" "}
                {selected.approx_square_footage || "—"}
              </div>
              <div>
                <span className="text-grey">Year built:</span>{" "}
                {selected.year_built || "—"}
              </div>
              <div>
                <span className="text-grey">Ownership:</span>{" "}
                {selected.ownership_status || "—"}
              </div>
              <div>
                <span className="text-grey">Mortgage:</span>{" "}
                {selected.has_mortgage
                  ? `Yes (${selected.mortgage_balance || "balance unknown"})`
                  : "No"}
              </div>
              <div>
                <span className="text-grey">Occupied:</span>{" "}
                {selected.is_occupied
                  ? `Yes — ${selected.occupant_type || "unspecified"}`
                  : "No"}
              </div>
              <div>
                <span className="text-grey">Condition:</span>{" "}
                {selected.condition || "—"}
              </div>
              <div>
                <span className="text-grey">Timeline:</span>{" "}
                {selected.timeline || "—"}
              </div>
              <div>
                <span className="text-grey">Reason for selling:</span>{" "}
                {selected.reason_for_selling || "—"}
              </div>
              <div>
                <span className="text-grey">Notes from seller:</span>{" "}
                {selected.additional_notes || "—"}
              </div>
            </div>

            {selected.photo_urls && selected.photo_urls.length > 0 && (
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wide text-grey">
                  Photos
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {selected.photo_urls.map((url) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={url}
                      src={url}
                      alt="Property"
                      className="aspect-square w-full border border-ink object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <label className="block text-xs uppercase tracking-wide text-grey">
                Status
              </label>
              <select
                className="mt-1 w-full border border-ink bg-paper px-3 py-2 text-sm"
                value={selected.status}
                onChange={(e) =>
                  updateLead(selected.id, { status: e.target.value })
                }>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {statusLabel(s)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-xs uppercase tracking-wide text-grey">
                Internal notes
              </label>
              <textarea
                className="mt-1 w-full border border-ink bg-paper px-3 py-2 text-sm"
                rows={4}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                onBlur={() =>
                  updateLead(selected.id, { internal_notes: notesDraft })
                }
              />
              <p className="mt-1 text-xs text-grey">
                Saves automatically when you click away.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
