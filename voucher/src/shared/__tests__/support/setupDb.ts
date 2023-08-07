import { connect, dataSource, disconnect } from '@infrastructure/repositories/config';

export const setupDb = () => {
  beforeAll(async () => {
    await connect();
    await cleanDb();
  });

  afterAll(disconnect);
  afterEach(cleanDb);
};

const cleanDb = async () => {
  const tables = ['vouchers'];
  await dataSource.query(tables.map((table) => `DELETE FROM ${table};`).join('\n'));
};
