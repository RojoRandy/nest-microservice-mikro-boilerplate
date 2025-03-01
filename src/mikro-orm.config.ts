import 'dotenv/config';
import { defineConfig, LoadStrategy, PopulateHint } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: [
  ],
  loadStrategy: LoadStrategy.JOINED,
  populateWhere: PopulateHint.INFER,
  debug: true,
  highlighter: new SqlHighlighter(),
  tsNode: true,
  allowGlobalContext: true,
  metadataProvider: TsMorphMetadataProvider,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  extensions: [Migrator, EntityGenerator, SeedManager],
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: 'dist/db/migrations',
    pathTs: 'src/db/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    emit: 'ts',
    generator: TSMigrationGenerator
  },
  seeder: {
    path: 'dist/db/seeders',
    pathTs: 'src/db/seeders',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  }
});