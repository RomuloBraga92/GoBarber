import { container } from 'tsyringe';

import IDiskStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IDiskStorageProvider>(
  'DiskStorageProvider',
  providers.disk,
);
