import { SupabaseClient, createClient } from "@supabase/supabase-js";
import CONFIG from "../config";
export class SupaBaseClient {

    client: SupabaseClient<'public'>

    constructor() {
        this.client = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY)
        return this
    }

}