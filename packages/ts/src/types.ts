import assert from 'assert'

export function bool(s: string): boolean {
  if (s === 'true') {
    return true
  } else if (s === 'false') {
    return false
  } else {
    throw new Error('invalid boolean string')
  }
}

export function boolStr(b: boolean): string {
  return b ? 'true' : 'false'
}

function stripType(s: string, type: string): string {
  return s.split(type)[0]
}

export function i8(s: string): bigint {
  return BigInt(stripType(s, 'i8'))
}

export function i8Str(i: bigint): string {
  return `${i}i8`
}

export function i16(s: string): bigint {
  return BigInt(stripType(s, 'i16'))
}

export function i16Str(i: bigint): string {
  return `${i}i16`
}

export function i32(s: string): bigint {
  return BigInt(stripType(s, 'i32'))
}

export function i32Str(i: bigint): string {
  return `${i}i32`
}

export function i64(s: string): bigint {
  return BigInt(stripType(s, 'i64'))
}

export function i64Str(i: bigint): string {
  return `${i}i64`
}

export function i128(s: string): bigint {
  return BigInt(stripType(s, 'i128'))
}

export function i128Str(i: bigint): string {
  return `${i}i128`
}

export function u8(s: string): bigint {
  return BigInt(stripType(s, 'u8'))
}

export function u8Str(i: bigint | number): string {
  return `${i}u8`
}

export function u16(s: string): bigint {
  return BigInt(stripType(s, 'u16'))
}

export function u16Str(i: bigint | number): string {
  return `${i}u16`
}

export function u32(s: string): bigint {
  return BigInt(stripType(s, 'u32'))
}

export function u32Str(i: bigint | number): string {
  return `${i}u32`
}

export function u64(s: string): bigint {
  return BigInt(stripType(s, 'u64'))
}

export function u64Str(i: bigint | number): string {
  return `${i}u64`
}

export function u128(s: string): bigint {
  return BigInt(stripType(s, 'u128'))
}

export function u128Str(i: bigint | number): string {
  return `${i}u128`
}

export function field(s: string): bigint {
  const v = BigInt(stripType(s, 'field'))
  assert(v >= 0n, 'field must be non-negative')
  return v
}

export function fieldStr(i: bigint | number): string {
  assert(i >= 0n, 'field must be non-negative')
  return `${i}field`
}

export class ProgramBase {
  constructor(private getMappingValueString: (mapping: string, key: string) => Promise<string>) {}

  protected async getMappingValueOrNull(mapping: string, key: string): Promise<string | null> {
    const value = await this.getMappingValueString(mapping, key)
    return value === 'null' ? null : value
  }

  protected async getMappingValue(mapping: string, key: string): Promise<string> {
    const value = await this.getMappingValueOrNull(mapping, key)
    if (value === null) {
      throw new Error(`Mapping value not found for key: ${key}`)
    }
    return value
  }

  protected async getMappingValueOrDefault(mapping: string, key: string, defaultValue: string): Promise<string> {
    const value = await this.getMappingValueOrNull(mapping, key)
    return value === null ? defaultValue : value
  }
}
