import { createClient } from "@supabase/supabase-js";

// ✅ Replace with your actual values from Supabase
const supabaseUrl = "https://your-project-id.supabase.co";
const supabaseAnonKey = "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
