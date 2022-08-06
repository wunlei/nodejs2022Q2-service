interface BaseData {
  artists: string[];
  albums: string[];
  tracks: string[];
}

type dbKey = keyof BaseData;

export class FavoritesDatabase {
  recordMap: BaseData = {
    artists: [],
    albums: [],
    tracks: [],
  };

  add(key: dbKey, record: string) {
    this.recordMap[key].push(record);
  }

  remove(key: dbKey, id: string) {
    const newRecordMap = this.recordMap[key].filter(
      (item: string) => item !== id,
    );
    this.recordMap[key] = newRecordMap;
  }

  findAll() {
    return this.recordMap;
  }

  findOneCollection(key: dbKey) {
    return this.recordMap[key];
  }

  findOneItem(key: dbKey, id: string) {
    const collection = this.recordMap[key];
    const item = collection.includes(id);
    return item;
  }
}
