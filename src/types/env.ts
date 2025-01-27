import { StaticDecode, Type as T } from "@sinclair/typebox";
import "dotenv/config";
import { LOG_LEVEL } from "@ubiquity-os/ubiquity-os-logger";

/**
 * Define sensitive environment variables here.
 *
 * These are fed into the worker/workflow as `env` and are
 * taken from either `dev.vars` or repository secrets.
 * They are used with `process.env` but are type-safe.
 */
export const envSchema = T.Object({
  LOG_LEVEL: T.Optional(T.Enum(LOG_LEVEL, { default: LOG_LEVEL.INFO })),
  KERNEL_PUBLIC_KEY: T.Optional(T.String()),
});

export type Env = StaticDecode<typeof envSchema>;
