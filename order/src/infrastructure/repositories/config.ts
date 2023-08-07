import "reflect-metadata";
import { createConnection, DataSource, getConnection } from "typeorm";
import { PostgresConnectionCredentialsOptions } from "typeorm/driver/postgres/PostgresConnectionCredentialsOptions";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { OrderEntity } from "./entities/OrderEntity";

const NODE_ENV = process.env.NODE_ENV || "test";

export const connect = async () => {
  try {
    const connection = await dataSource.initialize();
    if (NODE_ENV === "test") {
      await createConnection(connectionOptions);
    }
    console.info("connection started");
    return connection;
  } catch (e) {
    console.error("Failed to create DB connection", e);
    process.abort();
  }
};

export const disconnect = async (): Promise<void> => {
  if (NODE_ENV === "test") {
    await getConnection().close();
  }
  await dataSource.destroy();
};

export const checkConnection = async (): Promise<void> => {
  await dataSource.query("SELECT 1 as result");
};

const getConnectionOptions = (): PostgresConnectionOptions => {
  const entities = process.env.TYPEORM_ENTITIES?.split(",");
  const migrations = process.env.TYPEORM_MIGRATIONS;
  const subscribers = process.env.TYPEORM_SUBSCRIBERS;
  const synchronize = process.env.TYPEORM_SYNCHRONIZE === "true";
  const time = process.env.TYPEORM_MAX_QUERY_EXECUTION_TIME;

  return {
    type: "postgres",
    synchronize,
    entities: entities ?? [],
    migrations: migrations ? [migrations] : undefined,
    subscribers: subscribers ? [subscribers] : undefined,
    maxQueryExecutionTime: time ? parseInt(time, 10) : undefined,
    ...getDatabaseCredentials(),
  };
};

const getDatabaseCredentials = (): PostgresConnectionCredentialsOptions => {
  const port = process.env.TYPEORM_PORT;
  return {
    host: process.env.TYPEORM_HOST,
    port: port ? parseInt(port, 10) : undefined,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
  };
};

const connectionOptions = getConnectionOptions();
export const dataSource: DataSource = new DataSource(connectionOptions);
