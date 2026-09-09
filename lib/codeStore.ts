import { supabase } from './supabase'

export async function setCode(email: string, code: string) {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()

  const { error } = await supabase
    .from('verification_codes')
    .insert({ email, code, expires_at: expiresAt })

  if (error) throw error
}

export async function getCode(email: string) {
  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('verification_codes')
    .select('code')
    .eq('email', email)
    .gt('expires_at', now)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data.code
}

export async function deleteCode(email: string) {
  const { error } = await supabase
    .from('verification_codes')
    .delete()
    .eq('email', email)

  if (error) throw error
}
