import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  getDriver() {
    return process.env.STORAGE_DRIVER ?? 'local';
  }
}
