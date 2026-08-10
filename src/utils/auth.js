export const normalizeRole = (value) => {
  const rawRole = String(value ?? '').trim().toLowerCase()

  if (!rawRole) return 'USER'
  if (rawRole.includes('director')) return 'DIRECTOR'
  if (rawRole.includes('admin')) return 'ADMIN'
  if (rawRole.includes('super')) return 'ADMIN'

  return 'USER'
}

export const getUserRole = (user) => {
  if (!user) return 'USER'

  const roleValue = user.role ?? user.roles ?? user.userRole ?? user.rol ?? user.type
  return normalizeRole(roleValue)
}

export const getRoleRoute = (role) => {
  switch (normalizeRole(role)) {
    case 'DIRECTOR':
      return '/director/dashboard'
    case 'ADMIN':
      return '/admin/dashboard'
    default:
      return '/login'
  }
}

export const getEscuelaIdFromUser = (user) => {
  if (!user) return null

  return user.id ?? null
}
