// global.d.ts
import { MongoClient } from 'mongodb';

declare module NodeJS {
  interface Global {
    _mongoClientPromise: Promise<import("mongodb").MongoClient> | undefined;
  }
}

interface DeviceMotionEvent {
  requestPermission(): Promise<'granted' | 'denied'>;
}

export {};