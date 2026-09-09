"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase";

const STORAGE_KEY = "impessmistic_sell_form_draft";

type FormState = {
  full_name: string;
  phone: string;
  email: string;
  property_address: string;
  city: string;
  state: string;
  zip: string;
  property_type: string;
  bedrooms: string;
  bathrooms: string;
  approx_square_footage: string;
  year_built: string;
  ownership_status: string;
  has_mortgage: string;
  mortgage_balance: string;
  is_occupied: string;
  occupant_type: string;
  condition: string;
  reason_for_selling: string;
  timeline: string;
  additional_notes: string;
};

const initialState: FormState = {
  full_name: "",
  phone: "",
  email: "",
  property_address: "",
  city: "",
  state: "",
  zip: "",
  property_type: "",
  bedrooms: "",
  bathrooms: "",
  approx_square_footage: "",
  year_built: "",
  ownership_status: "",
  has_mortgage: "",
  mortgage_balance: "",
  is_occupied: "",
  occupant_type: "",
  condition: "",
  reason_for_selling: "",
  timeline: "",
  additional_notes: "",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wide text-grey">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full border border-ink bg-paper px-3 py-2 text-sm focus:outline-none";

export default function SellForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  // Restore any in-progress draft so a seller doesn't lose their answers
  // if they navigate away mid-form.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch {
        // ignore corrupt draft
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setSubmitting(true);
//     for (const [i, file] of photos.entries()) {
//   setUploadProgress(`Uploading photo ${i + 1} of ${photos.length}...`);
//       // existing upload code
//        try {
//          // Upload any photos directly to Supabase Storage first.
//          const photo_urls: string[] = [];
//          for (const file of photos) {
//            const path = `${Date.now()}-${file.name}`;
//            const { error: uploadError } = await supabaseBrowser.storage
//              .from("property-photos")
//              .upload(path, file);
//            if (uploadError) {
//              throw new Error(`Photo upload failed: ${uploadError.message}`);
//            }
//            const { data: publicUrl } = supabaseBrowser.storage
//              .from("property-photos")
//              .getPublicUrl(path);
//            photo_urls.push(publicUrl.publicUrl);
//          }

//          const res = await fetch("/api/leads", {
//            method: "POST",
//            headers: { "Content-Type": "application/json" },
//            body: JSON.stringify({
//              ...form,
//              has_mortgage: form.has_mortgage === "yes",
//              is_occupied: form.is_occupied === "yes",
//              photo_urls,
//            }),
//          });

//          if (!res.ok) {
//            const body = await res.json().catch(() => ({}));
//            throw new Error(body.error || "Something went wrong. Try again.");
//          }

//          localStorage.removeItem(STORAGE_KEY);
//          router.push("/thank-you");
//        } catch (err) {
//          setError(err instanceof Error ? err.message : "Something went wrong.");
//        } finally {
//          setSubmitting(false);
//        }
// }
// setUploadProgress("Saving details...");

   
//   }
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError(null);
  setSubmitting(true);

  try {
    const photo_urls: string[] = [];
    for (const [i, file] of photos.entries()) {
      setUploadProgress(`Uploading photo ${i + 1} of ${photos.length}...`);
      const path = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabaseBrowser.storage
        .from("property-photos")
        .upload(path, file);
      if (uploadError) {
        throw new Error(`Photo upload failed: ${uploadError.message}`);
      }
      const { data: publicUrl } = supabaseBrowser.storage
        .from("property-photos")
        .getPublicUrl(path);
      photo_urls.push(publicUrl.publicUrl);
    }

    setUploadProgress("Saving details...");

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        has_mortgage: form.has_mortgage === "yes",
        is_occupied: form.is_occupied === "yes",
        photo_urls,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Something went wrong. Try again.");
    }

    localStorage.removeItem(STORAGE_KEY);
    router.push("/thank-you");
  } catch (err) {
    setError(err instanceof Error ? err.message : "Something went wrong.");
  } finally {
    setSubmitting(false);
    setUploadProgress("");
  }
}
  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className="wordmark mb-2 text-2xl">Contact</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <input
              required
              className={inputClass}
              value={form.full_name}
              onChange={(e) => update("full_name", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <input
              required
              type="tel"
              className={inputClass}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity("Enter a valid phone number")
              }
              onInput={(e) => e.currentTarget.setCustomValidity("")}
            />
          </Field>
          <Field label="Email">
            {/* <input
              required
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            /> */}
            <input
              required
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity("Enter a valid email address")
              }
              onInput={(e) => e.currentTarget.setCustomValidity("")}
            />
          </Field>
        </div>
      </fieldset>

      {/* Property */}
      <fieldset className="space-y-4">
        <legend className="wordmark mb-2 text-2xl">Property</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Property address">
              <input
                required
                className={inputClass}
                value={form.property_address}
                onChange={(e) => update("property_address", e.target.value)}
              />
            </Field>
          </div>
          <Field label="City">
            <input
              className={inputClass}
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </Field>
          <Field label="State">
            <input
              className={inputClass}
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
            />
          </Field>
          <Field label="ZIP / postal code">
            <input
              className={inputClass}
              value={form.zip}
              onChange={(e) => update("zip", e.target.value)}
            />
          </Field>
          <Field label="Property type">
            <select
              className={inputClass}
              value={form.property_type}
              onChange={(e) => update("property_type", e.target.value)}>
              <option value="">Select</option>
              <option>Single-family</option>
              <option>Multi-family</option>
              <option>Condo</option>
              <option>Land</option>
              <option>Commercial</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Bedrooms">
            <input
              className={inputClass}
              value={form.bedrooms}
              onChange={(e) => update("bedrooms", e.target.value)}
            />
          </Field>
          <Field label="Bathrooms">
            <input
              className={inputClass}
              value={form.bathrooms}
              onChange={(e) => update("bathrooms", e.target.value)}
            />
          </Field>
          <Field label="Approx. square footage">
            <input
              className={inputClass}
              value={form.approx_square_footage}
              onChange={(e) => update("approx_square_footage", e.target.value)}
            />
          </Field>
          <Field label="Year built">
            <input
              className={inputClass}
              value={form.year_built}
              onChange={(e) => update("year_built", e.target.value)}
            />
          </Field>
        </div>
      </fieldset>

      {/* Situation */}
      <fieldset className="space-y-4">
        <legend className="wordmark mb-2 text-2xl">Situation</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ownership status">
            <select
              className={inputClass}
              value={form.ownership_status}
              onChange={(e) => update("ownership_status", e.target.value)}>
              <option value="">Select</option>
              <option>Own outright</option>
              <option>Mortgaged</option>
              <option>Inherited</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Do you have a mortgage on it?">
            <select
              className={inputClass}
              value={form.has_mortgage}
              onChange={(e) => update("has_mortgage", e.target.value)}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
          {form.has_mortgage === "yes" && (
            <Field label="Approx. mortgage balance">
              <input
                className={inputClass}
                value={form.mortgage_balance}
                onChange={(e) => update("mortgage_balance", e.target.value)}
              />
            </Field>
          )}
          <Field label="Is the property occupied?">
            <select
              className={inputClass}
              value={form.is_occupied}
              onChange={(e) => update("is_occupied", e.target.value)}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No, vacant</option>
            </select>
          </Field>
          {form.is_occupied === "yes" && (
            <Field label="Occupied by">
              <select
                className={inputClass}
                value={form.occupant_type}
                onChange={(e) => update("occupant_type", e.target.value)}>
                <option value="">Select</option>
                <option>Owner</option>
                <option>Tenant</option>
              </select>
            </Field>
          )}
          <Field label="Property condition">
            <select
              className={inputClass}
              value={form.condition}
              onChange={(e) => update("condition", e.target.value)}>
              <option value="">Select</option>
              <option>Move-in ready</option>
              <option>Needs minor work</option>
              <option>Needs major work</option>
              <option>Teardown</option>
            </select>
          </Field>
          <Field label="Timeline to sell">
            <select
              className={inputClass}
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value)}>
              <option value="">Select</option>
              <option>As soon as possible</option>
              <option>Within 30 days</option>
              <option>Within 90 days</option>
              <option>Flexible</option>
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Reason for selling">
              <textarea
                className={inputClass}
                rows={3}
                value={form.reason_for_selling}
                onChange={(e) => update("reason_for_selling", e.target.value)}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      {/* Photos */}
      <fieldset className="space-y-4">
        <legend className="wordmark mb-2 text-2xl">Photos</legend>
        <Field label="Upload photos of the property (optional, but it speeds things up)">
          <input
            type="file"
            accept="image/*"
            multiple
            className={inputClass}
            // onChange={(e) => setPhotos(Array.from(e.target.files ?? []))}
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              const valid = files.filter(
                (f) =>
                  f.type.startsWith("image/") && f.size <= 10 * 1024 * 1024, // 10MB
              );
              if (valid.length !== files.length) {
                setError(
                  "Some files were skipped — images only, max 10MB each.",
                );
              }
              setPhotos(valid);
            }}
          />
        </Field>
        {photos.length > 0 && (
          <p className="text-xs text-grey">{photos.length} file(s) selected</p>
        )}
      </fieldset>

      {/* Additional */}
      <fieldset className="space-y-4">
        <legend className="wordmark mb-2 text-2xl">Anything Else</legend>
        <Field label="Additional notes">
          <textarea
            className={inputClass}
            rows={4}
            value={form.additional_notes}
            onChange={(e) => update("additional_notes", e.target.value)}
          />
        </Field>
      </fieldset>

      {error && (
        <p className="border border-ink bg-ink px-4 py-3 text-sm text-paper">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full border-2 border-ink bg-ink px-8 py-4 text-lg font-bold text-paper transition hover:bg-paper hover:text-ink disabled:opacity-50">
        {/* {submitting ? "Submitting..." : "Submit & Get Your Offer →"} */}
        {uploadProgress || (submitting ? "Submitting..." : "Submit...")}
      </button>
    </form>
  );
}
