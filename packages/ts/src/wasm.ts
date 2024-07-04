let aleo: typeof import('@aleohq/sdk')

export async function importAleo() {
  if (!aleo) {
    if (!globalThis.Worker) {
      globalThis.Worker = class Worker extends EventTarget {
        postMessage() {}

        unref() {}
      } as typeof globalThis.Worker
    }

    aleo = await import('@aleohq/sdk')
  }
  return aleo
}

export async function bhp256HashToField(plaintext: string): Promise<string> {
  const aleo = await importAleo()
  return aleo.Plaintext.fromString(plaintext).hashBhp256().toString()
}

export async function programAddress(programId: string): Promise<string> {
  const aleo = await importAleo()
  return aleo.ProgramID.fromString(programId).toAddress()
}
