"use server"

import { z } from "zod"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function login(formData: FormData) {
    const supabase = createClient()

    const schema = z.object({
        email: z.string(),
        password: z.string()
    })

    const data = schema.parse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    supabase.auth.signInWithPassword(data)

    revalidatePath("/", "layout")
    redirect("/dashboard")
}