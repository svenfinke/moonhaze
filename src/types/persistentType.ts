import { entity } from "@google-cloud/datastore/build/src/entity";

export abstract class PersistentType {
    key: entity.Key | entity.Key[];
    data: any;
}