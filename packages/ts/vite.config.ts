/// <reference types="vitest" />
import * as path from 'path'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import packageJson from './package.json'

const getPackageName = () => {
  return packageJson.name
}

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase())
  } catch (err) {
    throw new Error('Name property in package.json is missing.')
  }
}

module.exports = defineConfig({
  base: './',
  build: {
    target: 'esnext',
    outDir: './dist',
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        operator: path.resolve(__dirname, 'src/operator.ts'),
      },
      name: getPackageNameCamelCase(),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['node:url', 'node:fs', '@aleohq/wasm'],
    },
  },
  test: {},
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@@', replacement: path.resolve(__dirname) },
    ],
  },
  worker: {
    format: 'es',
  },
  plugins: [nodePolyfills()],
})
