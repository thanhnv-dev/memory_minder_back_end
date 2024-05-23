const getMongoUri = () => {
  const username = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const clusterAddress = process.env.DATABASE_CLUSTER_ADDRESS;
  const database = process.env.DATABASE_NAME;

  return `mongodb+srv://${username}:${password}@${clusterAddress}/${database}`;
};

export { getMongoUri };
