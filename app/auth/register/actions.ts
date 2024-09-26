"use server"

import { z } from "zod"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signup(formData: FormData) {
    const supabase = createClient()

    const schema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
        confirmPassword: z.string()
    }).refine(data => data.password == data.confirmPassword, { message: "Passwords do not match" })

    const data = schema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirm-password")
    })

    supabase.auth.signUp(data)

    revalidatePath("/", "layout")
    redirect("/dashboard")
}