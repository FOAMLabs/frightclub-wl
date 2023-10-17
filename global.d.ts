// global.d.ts
import { MongoClient } from 'mongodb';

declare module NodeJS {
  interface Global {
    _mongoClientPromise: Promise<MongoClient>;
  }
}

interface DeviceMotionEvent {
  requestPermission(): Promise<'granted' | 'denied'>;
}

export {};