import { default as fastifyPlugin } from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

import type { Prisma } from "@prisma/client";

export interface DepixyDatabaseOptions {
  /**
   * PostgreSQL connection string
   */
  url?: string;
  /**
   * Log SQL query. Default to `false`.
   */
  logging?: boolean;

  /**
   * Prisma error format. Default to `minimal`.
   * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#errorformat
   */
  errorFormat?: Prisma.ErrorFormat;
}

const plugin = fastifyPlugin<DepixyDatabaseOptions>(
  async (fastify, opts = {}) => {
    if (fastify.hasDecorator("db")) {
      throw new Error("@depixy/database has already registered");
    }
    const { url, errorFormat = "minimal", logging = false } = opts;
    const db = new PrismaClient({
      datasources: url ? { db: { url } } : undefined,
      errorFormat,
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
      ]
    });
    if (logging) {
      db.$on("query", e => fastify.log.trace(e));
      db.$on("error", e => fastify.log.error(e));
      db.$on("info", e => fastify.log.info(e));
      db.$on("warn", e => fastify.log.warn(e));
    }
    fastify.decorate("db", db);
  },
  {
    name: "@depixy/database",
    fastify: "3.x"
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
