import Dexie, { Table } from 'dexie';

export type AppType = {
  id?: number;
  name: string;
  path: string;
  isApp: boolean;
};
export type ProgectType = {
  id?: number;
  name: string;
  path: string;
  isApp: boolean;
  code: string;
};
export type AppOrProject = ProgectType | AppType;
export interface BatchType {
  id?: number;
  name: string;
  list: AppOrProject[];
}
export class MyDatabase extends Dexie {
  projects!: Table<ProgectType>;
  apps!: Table<AppType>;
  batch!: Table<BatchType>;
  constructor() {
    super('MyDatabase');
    this.version(2).stores({
      projects: '++id, name, path,isApp,code',
      apps: '++id, name, path,isApp',
      batch: '++id,name,list'
    });
  }
}

export const db = new MyDatabase();
