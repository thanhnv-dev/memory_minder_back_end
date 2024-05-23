import { ConfigService } from '@nestjs/config';

const getMongoUri = (configService: ConfigService) => {
  const username = configService.get<string>('DATABASE_USER');
  const password = configService.get<string>('DATABASE_PASSWORD');
  const clusterAddress = configService.get<string>('DATABASE_CLUSTER_ADDRESS');
  const database = configService.get<string>('DATABASE_NAME');

  return `mongodb+srv://${username}:${password}@${clusterAddress}/${database}`;
};

export { getMongoUri };
