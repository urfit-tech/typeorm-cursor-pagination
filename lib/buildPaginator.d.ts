import { ObjectLiteral, ObjectType } from 'typeorm';
import Paginator, { Order } from './Paginator';
export interface PagingQuery {
    afterCursor?: string;
    beforeCursor?: string;
    limit?: number;
    order?: Order | 'ASC' | 'DESC';
}
export interface PaginationOptions<Entity> {
    entity: ObjectType<Entity>;
    alias?: string;
    query?: PagingQuery;
    paginationKeys?: Extract<keyof Entity, string>[];
}
export declare function buildPaginator<Entity extends ObjectLiteral>(options: PaginationOptions<Entity>): Paginator<Entity>;
