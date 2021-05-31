import { IRepository } from './repository';
import { PersistentType } from '../types/persistentType';
import { Datastore } from '@google-cloud/datastore';
import { entity } from '@google-cloud/datastore/build/src/entity';

export class DatastoreRepository<Type extends PersistentType> implements IRepository<Type>{
    data: Type;
    datastore: Datastore;

    constructor(){
        this.datastore = new Datastore();
    }

    load(filter: entity.Key | entity.Key[]): this{
        return this;
    }
    save(): this {
        this.datastore.save(this.data);
        return this;
    }
    refresh(): this{
        this.datastore.get(this.data.key);
        return this;
    }
    delete(): this{
        return this;
    }
}