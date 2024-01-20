import { StorageHelper } from "./storageHelper";
import { SupaBaseClient } from "./supabaseClient";





export const isActiveSession  = async () => {
    const supabase = new SupaBaseClient();
    return supabase.client.auth.getSession().then(({ data: { session } }) => {
        return Boolean(session);
      });
  
}

export const closeSession = async () => {
    const supabase = new SupaBaseClient();
    const { error } = await supabase.client.auth.signOut()
    StorageHelper.clear()
    window.location.assign("/");

}