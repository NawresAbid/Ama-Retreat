"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const credentials = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
        role: "client", // on force le rôle ici
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      // <-- URL de confirmation
    },
  });

  if (error) {
    return {
      status: error.message,
      user: null,
    };
  } else if (data?.user && data.user.identities?.length === 0) {
    return {
      status: "Email already exists",
      user: null,
    };
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}
export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    return {
      status: error.message,
      user: null,
    };
  }

  // Vérifie si le profil existe dans user_profiles
  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", credentials.email)
    .limit(1)
    .single();

  // Si le profil n'existe pas, créer le profil seulement si ce n’est PAS un admin
  if (!existingUser) {
    const isAdmin = data.user.user_metadata?.role === "admin";

    if (!isAdmin) {
      const { error: insertError } = await supabase
        .from("user_profiles")
        .insert({
          id: data.user.id,
          email: data.user.email,
          username: data.user.user_metadata?.username || "",
          role: "client",
        });

      if (insertError) {
        return {
          status: insertError.message,
          user: null,
        };
      }
    } else {
      // Admin non trouvé dans user_profiles (créé manuellement ?)
      return {
        status: "Admin connected (no profile needed)",
        user: data.user,
      };
    }
  }

  revalidatePath("/", "layout");

  return {
    status: "success",
    user: data.user,
  };
}
export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/login");
}