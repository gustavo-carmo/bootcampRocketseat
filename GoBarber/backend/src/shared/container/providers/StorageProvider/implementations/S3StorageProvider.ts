import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStorageProviders from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProviders {
  public async saveFile(file: string): Promise<string> {
    //  TODO - IMPLEMENTS
    return file;
  }

  public async deleteFile(file: string): Promise<void> {}
}

export default DiskStorageProvider;
