import Dexie, { Table } from 'dexie'

export type AppType = {
  id?: number
  name: string
  path: string
  isApp: boolean
}
export type ProgectType = {
  id?: number
  name: string
  path: string
  isApp: boolean
  code: string
}
export type AppOrProject = ProgectType | AppType
export class MyDatabase extends Dexie {
  projects!: Table<ProgectType>
  apps!: Table<AppType>
  constructor() {
    super('MyDatabase')
    this.version(1).stores({
      projects: '++id, name, path,isApp,code',
      apps: '++id, name, path,isApp',
    })
  }
}

export const db = new MyDatabase()
