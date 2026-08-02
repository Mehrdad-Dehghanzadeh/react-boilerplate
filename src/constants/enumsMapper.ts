import type { EnumMapper, TRoles } from '@/ts/Common'

export const ROLES_MAPPER: Record<TRoles, EnumMapper> = {
  admin: {
    title: 'مدیر پذیرنده'
  },
  reporter: {
    title: 'کاربر پذیرنده'
  }
}
