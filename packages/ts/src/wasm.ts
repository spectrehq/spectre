let aleo: any

export async function importAleo() {
  if (!aleo) {
    if (!globalThis.Worker) {
      (globalThis as any).Worker = class Worker extends EventTarget {
        postMessage() {}
        unref() {}
      }
    }

    aleo = await import('@aleohq/sdk')
  }
  return aleo
}

export async function bhp256HashToField(plaintext: string): Promise<string> {
  const aleo = await importAleo()
  return aleo.Plaintext.fromString(plaintext).hashBhp256().toString()
}
