import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    adapter: SupabaseAdapter({
        url: process.env.SUPABASE_URL as string,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string
    })
})