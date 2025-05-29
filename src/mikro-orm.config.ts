import 'dotenv/config';
import { defineConfig, LoadStrategy, PopulateHint } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

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
});