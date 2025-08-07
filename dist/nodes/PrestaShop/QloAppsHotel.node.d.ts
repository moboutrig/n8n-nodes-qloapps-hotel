import { IExecuteFunctions, ILoadOptionsFunctions, INodeExecutionData, INodePropertyOptions, INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class QloAppsHotel implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getLanguages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getShops(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getShopGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getOrderStates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getManufacturers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getSuppliers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getCurrencies(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getCountries(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getCustomerGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getProductAttributes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getOrderAttributes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getCustomerAttributes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getSpecificPriceAttributes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getCartRuleAttributes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
