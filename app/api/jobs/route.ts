import { processJob } from "@/lib/process-job";
import { admin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { after } from "next/server";

export const maxDuration = 60; // 1 minute

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return Response.json(
        { error: "User not authenticated" },
        { status: 401 },
      );

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const limits: [string, number, number][] = [
      [`ip:${ip}`, 20, 3600],
      [`user:${user.id}`, 20, 86400],
      ["global", 500, 86400],
    ];
    for (const [key, limit, window] of limits) {
      const { data: ok, error } = await admin.rpc("hit_rate_limit", {
        p_key: key,
        p_limit: limit,
        p_window: window,
      });
      if (error) throw error;
      if (!ok) {
        return Response.json(
          { error: "Too many uploads. Please try again later." },
          { status: 429 },
        );
      }
    }

    const file = (await req.formData()).get("image");
    if (
      !(file instanceof File) ||
      file.size > 5_000_000 ||
      !file.type.startsWith("image/")
    ) {
      return Response.json({ error: "Invalid file" }, { status: 400 });
    }

    const path = `${user.id}/${crypto.randomUUID()}`;
    const { error: uploadError } = await admin.storage
      .from("uploads")
      .upload(path, file, { contentType: file.type });
    if (uploadError) throw uploadError;

    const { data: job, error: jobError } = await admin
      .from("jobs")
      .insert({ user_id: user.id, image_path: path })
      .select("id")
      .single();
    if (jobError) throw jobError;

    after(() => processJob(job.id));

    return Response.json({ jobId: job.id });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "An error occurred while processing the request." },
      { status: 500 },
    );
  }
}
