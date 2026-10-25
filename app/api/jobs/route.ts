import { admin } from "@/lib/supabase/admin";
import { createClient } from "@lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const limits: [string, number, number][] = [
    [`ip:${ip}`, 10, 3600],
    [`user:${user.id}`, 20, 86400],
    ["global", 500, 86400],
  ];

  for (const [key, limit, window] of limits) {
    const { data: ok } = await admin.rpc("hit_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window: window,
    });
    if (!ok)
      return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const file = (await request.formData()).get("image") as File;
  if (!file || file.size > 5_000_000 || !file.type.startsWith("image/"))
    return Response.json({ error: "Invalid file" }, { status: 400 });

  const path = `${user.id}/${crypto.randomUUID()}`;
  await admin.storage.from("uploads").upload(path, file);

  const { data: job } = await admin
    .from("jobs")
    .insert({ user_id: user_id, image_path: path })
    .select("id")
    .single();

  after(() => processJob(job!.id));

  return Response.json({ jobId: job!.id });
}
