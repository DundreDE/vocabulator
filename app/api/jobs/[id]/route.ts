import { createClient } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select("status, result, error")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("GET /api/jobs/[id] fehlgeschlagen:", error);
    return Response.json({ error: "Abfrage fehlgeschlagen" }, { status: 500 });
  }
  if (!data)
    return Response.json({ error: "Job nicht gefunden" }, { status: 404 });

  return Response.json(data);
}
