import "server-only";
import { buildDeck } from "./deck-ai";
import { ocrImage } from "./ocr";
import { admin } from "./supabase/admin";

export async function processJob(id: string) {
  const { data: job } = await admin
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();
  if (!job) return;
  await admin.from("jobs").update({ status: "processing" }).eq("id", id);
  let rawText = "";

  try {
    const { data: blob, error: downloadError } = await admin.storage
      .from("uploads")
      .download(job.image_path);
    if (downloadError) {
      throw new Error(
        `Fehler beim Herunterladen des Bildes: ${downloadError.message}`,
      );
    }

    const base54 = Buffer.from(await blob.arrayBuffer()).toString("base64");
    const mime = blob.type.startsWith("image/") ? blob.type : "image/jpeg";
    const dataUri = `data:${mime};base64,${base54}`;
    rawText = await ocrImage(dataUri);
    console.log("OCR-Text:\n", rawText);
    const deck = await buildDeck(rawText);

    await admin
      .from("jobs")
      .update({ status: "done", result: deck })
      .eq("id", id);
  } catch (e) {
    console.error(`Error processing job ${id}:`, e);
    await admin
      .from("jobs")
      .update({
        status: "error",
        error: `${String(e)}\n\nOCR-Text:\n${rawText.slice(0, 2000)}`,
      })
      .eq("id", id);
  } finally {
    await admin.storage.from("uploads").remove([job.image_path]);
    await admin.from("jobs").update({ image_path: null }).eq("id", id);
  }
}
