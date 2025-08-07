import { IDataObject, IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions, IWebhookFunctions, INodeProperties, IHttpRequestMethods, IPollFunctions } from 'n8n-workflow';
import type { Filter, SortOrder, Translation } from './types';
export declare function qloappsHotelApiRequest(this: IWebhookFunctions | IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions, method: IHttpRequestMethods, resource: string, body?: any, queryString?: string, uri?: string, _headers?: IDataObject, option?: IDataObject): Promise<any>;
export declare function getSearchFilters(resource: string, filterableAttributeFunction: string, sortableAttributeFunction: string): INodeProperties[];
export declare function getFilterQuery(data: {
    conditions?: Filter[];
    sort?: SortOrder[];
    limit?: number;
}): string;
export declare function normalizeSearchLikePattern(value: string): string;
export declare function getCustomerOptionalFields(): INodeProperties[];
export declare function getCustomerFields(): string[];
export declare function getProductFields(): string[];
export declare function getProductOptionalFields(): INodeProperties[];
export declare function getProductOptionalTranslatableFields(): INodeProperties[];
export declare function getOrderFields(): string[];
export declare function getSpecificPriceFields(): string[];
export declare function getCartRuleFields(): string[];
export declare function getDefaultLanguage(this: ILoadOptionsFunctions): Promise<string>;
export declare function checkMultishop(this: ILoadOptionsFunctions): Promise<{
    name: string;
    value: boolean;
}[]>;
export declare const sort: (a: {
    name: string;
}, b: {
    name: string;
}) => 0 | 1 | -1;
export declare function buildMultilangField(field: {
    translations: Translation[];
}): {
    '@_id': string;
    __cdata: string;
}[];
