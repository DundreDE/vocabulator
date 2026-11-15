import JSZip from "jszip";
import initSqlJs from "sql.js";

export type ImportedCard = { front: string; back: string; tags: string[] };
export type ParseResult = { cards: ImportedCard[]; skipped: number };

function clean(html: string): string {
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\[sound:[^\]]*\]/g, "");
  const doc = new DOMParser().parseFromString(withBreaks, "text/html");
  return (doc.body.textContent ?? "").trim();
}

export async function parseApkg(file: File): Promise<ParseResult> {
  const zip = await JSZip.loadAsync(file);

  const modern = zip.file("collection.anki21");
  const legacy = zip.file("collection.anki2");
  if (!modern && zip.file("collection.anki21b")) throw new Error("NEW_FORMAT");
  const entry = modern ?? legacy;
  if (!entry) throw new Error("INVALID_APKG");

  const SQL = await initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
  const db = new SQL.Database(await entry.async("uint8array"));

  const rows = db.exec("SELECT flds, tags FROM notes")[0]?.values ?? [];
  db.close();

  const cards: ImportedCard[] = [];
  let skipped = 0;

  for (const [flds, tags] of rows) {
    const fields = String(flds).split("\x1f");
    if (fields.length < 2 || /\{\{c\d+::/.test(fields[0])) {
      skipped++;
      continue;
    }
    const front = clean(fields[0]);
    const back = clean(fields[1]);
    if (!front || !back) {
      skipped++;
      continue;
    }
    cards.push({
      front,
      back,
      tags: String(tags).trim().split(/\s+/).filter(Boolean),
    });
  }
  return { cards, skipped };
}
