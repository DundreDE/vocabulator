CREATE TABLE "public"."cards" (
  "id"       uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "deck_id"  uuid,
  "front"    text                     NOT NULL,
  "back"     text                     NOT NULL,
  "ease"     real                     DEFAULT 2.5,
  "interval" integer                  DEFAULT 0,
  "reps"     integer                  DEFAULT 0,
  "due"      timestamp with time zone DEFAULT now(),
  CONSTRAINT "cards_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."cards"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."decks" (
  "id"      uuid NOT NULL DEFAULT gen_random_uuid(),
  "name"    text NOT NULL,
  CONSTRAINT "decks_pkey" PRIMARY KEY (id),
  "user_id" uuid NOT NULL DEFAULT auth.uid()
);

ALTER TABLE "public"."decks"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."cards"
  ADD CONSTRAINT "cards_deck_id_fkey" FOREIGN KEY (deck_id) REFERENCES public.decks(id) ON DELETE CASCADE;

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."cards" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."cards" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."cards" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."cards" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."decks" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."decks" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."decks" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."decks" TO "service_role";

ALTER TABLE "public"."decks"
  ADD CONSTRAINT "decks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);

CREATE POLICY "own decks" ON "public"."decks"
  FOR ALL
  TO PUBLIC
  USING ((user_id = auth.uid()));

