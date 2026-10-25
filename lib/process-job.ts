export async function processJob(id: string) {
  const { data: job } = await admin
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();
  if (!job) return;
  await admin.from("jobs").update({ status: "processing" }).eq("id", id);

  try {
    const { data: signed } = await admin.storage
      .from("uploads").createSignedUrl(job.image_path, 300);

    const res = await fetch(process.env.HACKCLUB_AI_URL!, {

    })


  }

}
