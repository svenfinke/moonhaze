import { entity } from "@google-cloud/datastore/build/src/entity";

export interface IRepository<IType>{
    data: IType;

    load(key: entity.Key | entity.Key[]): this;
    save(): this;
    refresh(): this;
    delete(): this;
}