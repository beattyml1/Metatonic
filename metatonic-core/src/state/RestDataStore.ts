import {PersistentDataStore, RecordResource} from "./PersistentDataStore";
import {Rest} from "../services/Rest";
import {FormSchema} from "../domain/Schema/RootSchemas";
import {OptionalProps} from "../CoreTypes";
import {UnitCategory} from "../domain/Schema/Quantities";
import {Unit} from "../domain/Schema/Quantities";
export class RestDataStore implements PersistentDataStore {
    constructor(protected metaTonicApiUrl: string){}
    records<T extends {id}>(resourceName: string) {
        return new RestRecordResource<T>(this.metaTonicApiUrl, resourceName)
    }
    schema(): Promise<FormSchema> {
        return Rest.Get<FormSchema, any>(`${this.metaTonicApiUrl}/schema`);
    }

    units(params?: { category?: string; measurementSystem?: string; group?: string }): Promise<Unit[]> {
        return Rest.Get<Unit[]>(`units`, params);
    }

    unit(key): Promise<Unit> {
        return Rest.Get<Unit>(`units/${key}`);
    }

    unitCategory(name): Promise<UnitCategory> {
        return Rest.Get<UnitCategory>(`unitCategories/${name}`);
    }
}

export class RestRecordResource<T extends {id}> implements RecordResource<T> {

    constructor(protected metaTonicApiUrl: string, protected recordName: string) {

    }

    getOne(id: string): Promise<T> {
        return Rest.Get<T, any>(`${this.metaTonicApiUrl}/records/${this.recordName}/${id}`);
    }

    getAll(): Promise<T[]>  {
        return Rest.Get<T[], any>(`${this.metaTonicApiUrl}/records/${this.recordName}`);
    }

    textSearch(text: string) {
        return Rest.Get<T[], any>(`${this.metaTonicApiUrl}/records/${this.recordName}`, { $textSearch: text });
    }

    getMany<TParams = OptionalProps<T>>(group: string, params: TParams) {
        return Rest.Get<T[], any>(`${this.metaTonicApiUrl}/records/${this.recordName}`, params);
    }

    create(data: T) {
        return Rest.Post<T, any>(`${this.metaTonicApiUrl}/records/${this.recordName}`, data);
    }

    update(data: T) {
        return Rest.Put<T, any>(`${this.metaTonicApiUrl}/records/${this.recordName}/${data.id}`, data);
    }

    delete(id: string) {
        return Rest.Delete(`${this.metaTonicApiUrl}/records/${this.recordName}/${id}`);
    }

    schema(): Promise<FormSchema> {
        return Rest.Get<FormSchema, any>(`${this.metaTonicApiUrl}/records/${this.recordName}/$form-schema`);
    }

}