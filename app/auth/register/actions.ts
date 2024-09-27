"use server"

import { z, ZodError } from "zod"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signup(prevState: any, formData: FormData) {
    const supabase = createClient()

    const schema = z.object({
        email: z.string().email({ message: "Invalid email address." }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
        confirmPassword: z.string()
    }).refine(data => data.password == data.confirmPassword, { message: "Passwords do not match." })

    const result = schema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirm-password")
    })

    if (!result.success) return {message: result.error.issues[0].message}

    const { error } = await supabase.auth.admin.createUser(result.data)
    if (error) return {message: error.message}

    revalidatePath("/", "layout")
    redirect("/dashboard")
}