
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { prisma } from "../../lib/prisma";

export async function DELETE() {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // Ignore cookie errors in this route
            }
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "You must be logged in to delete your account.",
        },
        { status: 401 }
      );
    }

    /*
     * Admin client.
     *
     * SUPABASE_SERVICE_ROLE_KEY must stay server-side.
     */
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    /*
     * Find the CareerVault User record using
     * the authenticated user's email.
     */
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email!,
      },
    });

    /*
     * Delete the CareerVault database user.
     *
     * Your Prisma schema has onDelete: Cascade,
     * so all resumes belonging to this user
     * will also be deleted.
     */
    if (existingUser) {
      await prisma.user.delete({
        where: {
          id: existingUser.id,
        },
      });
    }

    /*
     * Delete the Supabase Authentication account.
     */
    const { error: deleteAuthError } =
      await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deleteAuthError) {
      console.error(
        "Supabase Auth deletion error:",
        deleteAuthError
      );

      return NextResponse.json(
        {
          error:
            "Your application data was deleted, but the authentication account could not be deleted.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("Account deletion error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete account.",
      },
      { status: 500 }
    );
  }
}

