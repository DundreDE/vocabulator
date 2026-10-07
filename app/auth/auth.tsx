"use client";

import { AuthPage } from "@/app/components/AuthPage";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
// import { getSupabaseBrowserClient } from "@/lib/supabaseclient";

interface AuthPageProps {
  user: User | null;
}

type Mode = "sign-in" | "sign-up";

