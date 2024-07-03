const config = {
  compilationOptions: {
    preferredConfigPath: './tsconfig.json',
  },
  entries: [
    {
      filePath: './src/index.ts',
      outFile: './dist/index.d.ts',
      noCheck: false,
    },
    {
      filePath: './src/operator.ts',
      outFile: './dist/operator.d.ts',
      noCheck: false,
    },
  ],
}

module.exports = config
