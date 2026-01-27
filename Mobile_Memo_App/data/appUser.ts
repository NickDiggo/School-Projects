import { supabase } from "@/lib/supabase";

export type AppUser = {
  id: string;
  email: string;
  username: string;
  role: string;
};

export async function getOrCreateUserWithAuthId(): Promise<AppUser> {
  const { data: uRes, error: uErr } = await supabase.auth.getUser();
  if (uErr) throw uErr;

  const authUser = uRes.user;
  if (!authUser?.id || !authUser.email) {
    throw new Error("Invalid auth user");
  }

  // 1) check of user bestaat
  const { data: existing, error: selErr } = await supabase
    .from("User")
    .select("id,email,username,role")
    .eq("id", authUser.id)
    .maybeSingle()
    .returns<AppUser>();

  if (selErr) throw selErr;
  if (existing) return existing;

  // 2) maak user aan met auth id
  const { data: created, error: insErr } = await supabase
    .from("User")
    .insert([
      {
        id: authUser.id,
        email: authUser.email,
        username: authUser.email.split("@")[0],
        role: "User",
        password: "SUPABASE_AUTH",
      },
    ])
    .select("id,email,username,role")
    .single()
    .returns<AppUser>();

  if (insErr) throw insErr;
  if (!created) throw new Error("Failed to create user");

  return created;
}
