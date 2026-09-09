export function parseStorageUri(value) {
  const raw = String(value || '')
  if (!raw.startsWith('storage://')) return null

  const rest = raw.slice('storage://'.length)
  const slash = rest.indexOf('/')
  if (slash <= 0) return null

  return {
    bucket: rest.slice(0, slash),
    path: rest.slice(slash + 1),
  }
}

export function publicStorageUrl(supabase, value) {
  const ref = parseStorageUri(value)
  if (!ref) return value || null

  const { data } = supabase.storage.from(ref.bucket).getPublicUrl(ref.path)
  return data?.publicUrl || null
}
