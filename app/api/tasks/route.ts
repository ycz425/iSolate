import { createClient } from "@supabase/supabase-js"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

export const GET = withApiAuthRequired(async (request: Request) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { user } = await getSession()

    const params = (new URL(request.url)).searchParams
    const tab = params.get("tabId")
    const tag = params.getAll("tagId")

    const { data, error } = await supabase.from("tasks").select().eq("user_id", user.user_id)

    console.log(data)

    return new Response(JSON.stringify({message: "Success"}))

})
