import { supabase } from './supabase'

export async function addUser(email: string, password: string) {
  const { data, error } = await supabase
    .from('users')
    .insert({ email, password })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUser(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

export async function hasUser(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return false
    throw error
  }
  return true
}
