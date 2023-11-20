import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wjzjdrhhcnjshxyduchn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqempkcmhoY25qc2h4eWR1Y2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyNDQ4ODUsImV4cCI6MjAxNTgyMDg4NX0.ykMgMZRn9N2w5fVyMTbj4btJ5KgOJTtlKPzLh5boCn4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
