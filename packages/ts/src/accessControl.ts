import { bool, ProgramBase, u8, u8Str } from './types'
import { bhp256HashToField } from './wasm'
import { DEFAULT_ADMIN_ROLE } from './const'

export class AccessControlProgram extends ProgramBase {
  async isInitialized() {
    return bool(await this.getMappingValueOrDefault('initialized', '0u8', 'false'))
  }

  async hasRole(role: number, account: string) {
    const hash = await bhp256HashToField(`{
      account: ${account},
      role: ${u8Str(role)}
    }`)
    return bool(await this.getMappingValueOrDefault('grants', hash, 'false'))
  }

  async isRoleAdmin(role: number, adminRoleOrAccount: number | string) {
    const adminRole = Number(
      u8(await this.getMappingValueOrDefault('role_admins', u8Str(role), u8Str(DEFAULT_ADMIN_ROLE)))
    )
    if (typeof adminRoleOrAccount === 'number') {
      return adminRoleOrAccount === adminRole
    } else {
      return this.hasRole(adminRole, adminRoleOrAccount)
    }
  }
}
