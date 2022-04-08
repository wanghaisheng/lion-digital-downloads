import { createClient } from '@supabase/supabase-js'

const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const dbAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const DB = createClient(dbUrl, dbAnonKey)