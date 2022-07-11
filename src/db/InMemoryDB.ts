interface BaseData {
  id?: string;
}
export class InMemoryDatabase<T extends BaseData> {
  private recordMap: { [id: string]: T } = {};

  create(record: T): T {
    this.recordMap[record.id] = record;
    return record;
  }

  update(id: string, record: T): T {
    this.recordMap[id] = record;
    return record;
  }

  delete(id: string): void {
    delete this.recordMap[id];
  }

  findOne(id: string): T {
    return this.recordMap[id];
  }

  findAll(): T[] {
    return Object.values(this.recordMap);
  }
}
