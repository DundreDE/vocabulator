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
    console.error("GET /api/jobs/[id] failed:", error);
    return Response.json({ error: "Job failed" }, { status: 500 });
  }
  if (!data) return Response.json({ error: "Job not found" }, { status: 404 });

  return Response.json(data);
}
