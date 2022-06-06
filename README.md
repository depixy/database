# @depixy/database

[![License][license-badge]][license] [![GitHub][github-badge]][github] [![NPM][npm-badge]][npm] [![Conventional Commits][conventional-commits-badge]][conventional-commits]

Database plugin for [Depixy][depixy]. It is included in Depixy.

## Usage

```ts
import fastify from "fastify";
import database from "@depixy/database";

const opts = {};
const app = fastify();
await app.register(database, opts);

await app.db.user.create({ data });
```

## Options

See `DepixyDatabaseOptions`.

[depixy]: https://github.com/depixy/depixy
[conventional-commits]: https://conventionalcommits.org
[conventional-commits-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[license]: ./LICENSE
[license-badge]: https://img.shields.io/github/license/depixy/database?label=License
[npm]: https://www.npmjs.com/package/@depixy/database
[npm-badge]: https://img.shields.io/npm/v/@depixy/database
[github]: https://github.com/depixy/database
[github-badge]: https://img.shields.io/github/package-json/v/depixy/database?label=GitHub
