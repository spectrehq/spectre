import assert from "assert"
import { parsePlaintextToCst } from "./parser"

export function bool(s: string): boolean {
  if (s === "true") {
    return true
  } else if (s === "false") {
    return false
  } else {
    throw new Error("invalid boolean string")
  }
}

export function boolStr(b: boolean): string {
  return b ? "true" : "false"
}

function stripType(s: string, type: string): string {
  return s.split(type)[0]
}

export function i8(s: string): bigint {
  return BigInt(stripType(s, "i8"))
}

export function i8Str(i: bigint): string {
  return `${i}i8`
}

export function i16(s: string): bigint {
  return BigInt(stripType(s, "i16"))
}

export function i16Str(i: bigint): string {
  return `${i}i16`
}

export function i32(s: string): bigint {
  return BigInt(stripType(s, "i32"))
}

export function i32Str(i: bigint): string {
  return `${i}i32`
}

export function i64(s: string): bigint {
  return BigInt(stripType(s, "i64"))
}

export function i64Str(i: bigint): string {
  return `${i}i64`
}

export function i128(s: string): bigint {
  return BigInt(stripType(s, "i128"))
}

export function i128Str(i: bigint): string {
  return `${i}i128`
}

export function u8(s: string): bigint {
  return BigInt(stripType(s, "u8"))
}

export function u8Str(i: bigint | number): string {
  return `${i}u8`
}

export function u16(s: string): bigint {
  return BigInt(stripType(s, "u16"))
}

export function u16Str(i: bigint | number): string {
  return `${i}u16`
}

export function u32(s: string): bigint {
  return BigInt(stripType(s, "u32"))
}

export function u32Str(i: bigint | number): string {
  return `${i}u32`
}

export function u64(s: string): bigint {
  return BigInt(stripType(s, "u64"))
}

export function u64Str(i: bigint | number): string {
  return `${i}u64`
}

export function u128(s: string): bigint {
  return BigInt(stripType(s, "u128"))
}

export function u128Str(i: bigint | number): string {
  return `${i}u128`
}

export function field(s: string): bigint {
  return BigInt(stripType(s, "field"))
}

export function fieldStr(i: bigint | number): string {
  return `${i}field`
}

export function group(s: string): bigint {
  return BigInt(stripType(s, "group"))
}

export function groupStr(i: bigint | number): string {
  return `${i}group`
}

export function scalar(s: string): bigint {
  return BigInt(stripType(s, "scalar"))
}

export function scalarStr(i: bigint | number): string {
  return `${i}scalar`
}

export class ProgramBase {
  constructor(private getMappingValueString: (mapping: string, key: string) => Promise<string>) {
  }

  protected async getMappingValueOrNull(mapping: string, key: string): Promise<string | null> {
    const value = await this.getMappingValueString(mapping, key)
    return value === "null" ? null : value
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

export type Literal = string | boolean | bigint

/** Parses a string into a literal.
 * Assume the literal is legitimate.
 * Reference: snarkVM/console/program/src/data/literal/parse.rs
 * @param literal
 */
export function parseLiteral(literal: string): Literal {
  try {
    if (literal.startsWith("aleo1")) {
      return literal // address
    } else if (literal === "true" || literal === "false") {
      return bool(literal)
    } else if (literal.endsWith("field")) {
      return field(literal)
    } else if (literal.endsWith("group")) {
      return group(literal)
    } else if (literal.endsWith("i8")) {
      return i8(literal)
    } else if (literal.endsWith("i16")) {
      return i16(literal)
    } else if (literal.endsWith("i32")) {
      return i32(literal)
    } else if (literal.endsWith("i64")) {
      return i64(literal)
    } else if (literal.endsWith("i128")) {
      return i128(literal)
    } else if (literal.endsWith("u8")) {
      return u8(literal)
    } else if (literal.endsWith("u16")) {
      return u16(literal)
    } else if (literal.endsWith("u32")) {
      return u32(literal)
    } else if (literal.endsWith("u64")) {
      return u64(literal)
    } else if (literal.endsWith("u128")) {
      return u128(literal)
    } else if (literal.endsWith("scalar")) {
      return scalar(literal)
    } else {
      return literal
    }
  } catch {
    return literal
  }
}

function parseCst(cst: Plaintext): Plaintext {
  if (Array.isArray(cst)) {
    return cst.map((c: any) => parseCst(c))
  } else if (typeof cst === "object") {
    return Object.fromEntries(
      Object.entries(cst).map(([key, val]: [string, any]) => [key, parseCst(val)])
    )
  } else {
    return parseLiteral(cst as string)
  }
}

export type Plaintext = Record<string, unknown> | Array<unknown> | Literal

/**
 * Parses a string into a plaintext.
 * Assume the plaintext is legitimate.
 * Reference: snarkVM/console/program/src/data/plaintext/parse.rs
 * @param plaintext
 */
export function parsePlaintext(plaintext: string): Plaintext {
  assert(plaintext !== "null", "plaintext cannot be null")

  // Replace escaped newlines and remove quotes which may come from the REST API.
  plaintext = plaintext.replaceAll("\\n", "\n").replaceAll("\"", "")

  // Remove leading/trailing whitespaces.
  plaintext = plaintext.trim()

  const { cst, lexErrors, parseErrors } = parsePlaintextToCst(plaintext)

  assert(lexErrors.length === 0, lexErrors.join("\n"))
  assert(parseErrors.length === 0, parseErrors.join("\n"))

  return parseCst(cst)
}
