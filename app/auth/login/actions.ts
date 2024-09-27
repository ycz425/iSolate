"use server"

import { z } from "zod"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"


export async function login(prevState: any, formData: FormData) {
    const supabase = createClient()

    const schema = z.object({
        email: z.string(),
        password: z.string()
    })

    const result = schema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if (!result.success) return {message: result.error.issues[0].message}

    const { error } = await supabase.auth.signInWithPassword(result.data)
    if (error?.code == "validation_failed") return {message: "Missing email address."}
    if (error) return {message: error.message}

    revalidatePath("/", "layout")
    redirect("/dashboard")
}

