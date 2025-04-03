import Dexie from 'dexie';

export interface PendingRequest {
  id?: number; // ID automático
  url: string;
  method: string;
  body: any;
}

export class AppDB extends Dexie {
  pendingRequests: Dexie.Table<PendingRequest, number>;

  constructor() {
    super('OfflineAppDB');
    this.version(1).stores({
      pendingRequests: '++id, url, method, body' // Define la estructura de la tabla
    });
    this.pendingRequests = this.table('pendingRequests');
  }
}

export const db = new AppDB();