# Cloudflare workers, D1, Hono, drizzle, better-auth template

For React native, the client integrate with the better-auth, refer: [RN-Expo-Starter
Public template](https://github.com/qinsong77/RN-Expo-Starter/tree/gluestack-better-auth)

### 1. install dependencies

```shell
bun i
```

### 2.Update wrangle configs and .dev.vars

#### 2.1 Create D1 database

Create on cloudflare web dashboard or:

```shell
bun wrangler d1 create db-name         # for cf db
```

- update `wrangler.jsonc` and configure it based on your project, currently the d1 configuration is required:

```json
{
  "d1_databases": [
    {
      "binding": "D1",
      "database_name": "your-database-name",
      "database_id": "your_database_id",
      "migrations_dir": "drizzle_migrations/d1"
    }
  ]
}
```

- copy `.dev.vars.example` to `.dev.vars` and update the values

Then you can run `bun run typegen:cf` to generate/overwrite your `worker-configuration.d.ts`

#### 3. Generate schema and migration sql - skip

The template had generated, you can skip or re-run to overwrite.

```shell
bun run better-auth-gen-schema # generate better-auth table schema, if you updated `better-auth.config.ts`, need to run again to update/overwrite
bun run db:generate # generate migration sql
```

#### 4. Migrate D1 database

```shell
bun run db:apply db-name --local   # for local db, this also will create local db in `.wrangler` if not existed
bun run db:apply db-name --remote  # for cf db
```

#### 5. Run project locally

```shell
bun dev
```

Check `http://localhost:8787/api/auth/reference` for better auth apis.

#### 6. Deploy project to Workers

```shell
bun deplpy
```
