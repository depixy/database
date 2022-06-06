import fastifyPlugin from "fastify-plugin";
import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

export interface DepixyDatabaseOptions {
  // PostgreSQL connection string
  url?: string;
}

const plugin = fastifyPlugin<DepixyDatabaseOptions>(
  async (fastify, opts = {}) => {
    if (fastify.hasDecorator("db")) {
      throw new Error("@depixy/database has already registered");
    }
    const { url } = opts;
    const clientOpts: Prisma.PrismaClientOptions = {
      datasources: url ? { db: { url } } : undefined,
      errorFormat: "minimal"
    };
    const db = new PrismaClient(clientOpts);
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
