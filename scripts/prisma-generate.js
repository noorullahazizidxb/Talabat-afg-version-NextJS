const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const rootDir = process.cwd()
const prismaDir = path.join(rootDir, 'prisma')
const sourceSchemaPath = path.join(prismaDir, 'schema.prisma')
const generatedSchemaPath = path.join(prismaDir, 'schema.generated.prisma')

const schemaSource = fs.readFileSync(sourceSchemaPath, 'utf8')
const configuredProvider = (process.env.DATABASE_PROVIDER || '').trim().toLowerCase()
const databaseUrl = (process.env.DATABASE_URL || '').trim()

let provider = configuredProvider

if (!provider) {
  provider = databaseUrl.startsWith('mysql:') ? 'mysql' : 'sqlite'
}

if (!['mysql', 'sqlite'].includes(provider)) {
  console.error(`Unsupported DATABASE_PROVIDER "${provider}". Expected "mysql" or "sqlite".`)
  process.exit(1)
}

if (!process.env.DATABASE_URL && provider === 'sqlite') {
  process.env.DATABASE_URL = 'file:./dev.db'
}

const generatedSchema = schemaSource.replace(
  /provider\s*=\s*env\("DATABASE_PROVIDER"\)/,
  `provider = "${provider}"`
)

if (generatedSchema === schemaSource) {
  console.error('Failed to replace DATABASE_PROVIDER in prisma/schema.prisma before generation.')
  process.exit(1)
}

fs.writeFileSync(generatedSchemaPath, generatedSchema)

const prismaCliPath = require.resolve('prisma/build/index.js')
const result = spawnSync(process.execPath, [prismaCliPath, 'generate', '--schema', generatedSchemaPath], {
  cwd: rootDir,
  env: process.env,
  stdio: 'inherit',
})

try {
  fs.unlinkSync(generatedSchemaPath)
} catch (error) {
  if (error && error.code !== 'ENOENT') {
    console.warn(`Unable to remove ${generatedSchemaPath}:`, error.message)
  }
}

if (result.error) {
  console.error(result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 1)
