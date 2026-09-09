import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wyiblnwdbdxaqsaaoyed.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aWJsbndkYmR4YXFzYWFveWVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzNTA4MywiZXhwIjoyMTA0NDExMDgzfQ._1Wf0Oym7OYpuEnY4D1Ds0DEJaJTDugxWv04MFnNbjQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
