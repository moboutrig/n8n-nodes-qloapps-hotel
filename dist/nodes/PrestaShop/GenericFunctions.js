"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
exports.qloappsHotelApiRequest = qloappsHotelApiRequest;
exports.getSearchFilters = getSearchFilters;
exports.getFilterQuery = getFilterQuery;
exports.normalizeSearchLikePattern = normalizeSearchLikePattern;
exports.getCustomerOptionalFields = getCustomerOptionalFields;
exports.getCustomerFields = getCustomerFields;
exports.getProductFields = getProductFields;
exports.getProductOptionalFields = getProductOptionalFields;
exports.getProductOptionalTranslatableFields = getProductOptionalTranslatableFields;
exports.getOrderFields = getOrderFields;
exports.getSpecificPriceFields = getSpecificPriceFields;
exports.getCartRuleFields = getCartRuleFields;
exports.getDefaultLanguage = getDefaultLanguage;
exports.checkMultishop = checkMultishop;
exports.buildMultilangField = buildMultilangField;
const n8n_workflow_1 = require("n8n-workflow");
async function qloappsHotelApiRequest(method, resource, body = {}, queryString = '', uri, _headers = {}, option = {}) {
    const credentials = await this.getCredentials("qloappsHotelApi");
    const output = this.getNodeParameter('output', 'JSON');
    if (!_headers['Output-Format']) {
        _headers['Output-Format'] = output;
    }
    let options = {
        method,
        body,
        baseURL: `${credentials.baseUrl}/api/`,
        url: uri || `${resource}?${queryString}`,
        json: true,
        headers: { ..._headers }
    };
    try {
        options = Object.assign({}, options, option);
        if (Object.keys(body).length === 0) {
            delete options.body;
        }
        return await this.helpers.httpRequestWithAuthentication.call(this, "qloappsHotelApi", options);
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
function getConditionTypeFields() {
    return {
        displayName: 'Condition Type',
        name: 'condition_type',
        type: 'options',
        options: [
            {
                name: 'Equals',
                value: 'eq',
            },
            {
                name: 'Greater than',
                value: 'gt',
            },
            {
                name: 'In',
                value: 'in',
                description: 'The value can contain a pipe-separated list of values (example: 1|2|3)',
            },
            {
                name: 'Interval',
                value: 'interval',
                description: 'The value must contain a comma-separated range of values (example: 10,33)',
            },
            {
                name: 'Less Than',
                value: 'lt',
            },
            {
                name: 'Like',
                value: 'like',
                description: 'The value can contain the SQL wildcard character (%) at the beginning|end|both',
            },
            {
                name: 'Not Equal',
                value: 'neq',
            },
            {
                name: 'Not In',
                value: 'nin',
                description: 'The value can contain a pipe-separated list of values (example: 1|2|3)',
            },
        ],
        default: 'eq',
    };
}
function getConditions(attributeFunction) {
    return [
        {
            displayName: 'Field',
            name: 'field',
            type: 'options',
            typeOptions: {
                loadOptionsMethod: attributeFunction,
            },
            default: '',
        },
        getConditionTypeFields(),
        {
            displayName: 'Value',
            name: 'value',
            type: 'string',
            default: '',
        },
    ];
}
function getSearchFilters(resource, filterableAttributeFunction, sortableAttributeFunction) {
    return [
        {
            displayName: 'Filter',
            name: 'filterType',
            type: 'options',
            options: [
                {
                    name: 'None',
                    value: 'none',
                },
                {
                    name: 'Manual',
                    value: 'manual',
                },
            ],
            displayOptions: {
                show: {
                    resource: [resource],
                    operation: ['getAll'],
                },
            },
            default: 'none',
        },
        {
            displayName: 'Filters',
            name: 'filters',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: true,
            },
            displayOptions: {
                show: {
                    resource: [resource],
                    operation: ['getAll'],
                    filterType: ['manual'],
                },
            },
            default: {},
            placeholder: 'Add Condition',
            options: [
                {
                    displayName: 'Conditions',
                    name: 'conditions',
                    values: [...getConditions(filterableAttributeFunction)],
                },
            ],
        },
        {
            displayName: 'Options',
            name: 'options',
            type: 'collection',
            placeholder: 'Add option',
            default: {},
            displayOptions: {
                show: {
                    resource: [resource],
                    operation: ['getAll'],
                },
            },
            options: [
                {
                    displayName: 'Sort',
                    name: 'sort',
                    type: 'fixedCollection',
                    placeholder: 'Add Sort',
                    typeOptions: {
                        multipleValues: true,
                    },
                    default: [],
                    options: [
                        {
                            displayName: 'Sort',
                            name: 'sort',
                            values: [
                                {
                                    displayName: 'Direction',
                                    name: 'direction',
                                    type: 'options',
                                    options: [
                                        {
                                            name: 'Ascending',
                                            value: 'ASC',
                                        },
                                        {
                                            name: 'Descending',
                                            value: 'DESC',
                                        },
                                    ],
                                    default: 'ASC',
                                    description: 'The sorting direction',
                                },
                                {
                                    displayName: 'Field',
                                    name: 'field',
                                    type: 'options',
                                    typeOptions: {
                                        loadOptionsMethod: sortableAttributeFunction,
                                    },
                                    default: '',
                                    description: 'The sorting field',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
function getFilterQuery(data) {
    var _a, _b;
    let queryParams = {};
    if (typeof data.limit === 'number' && data.limit > 0) {
        queryParams.limit = data.limit;
    }
    if (data.sort && data.sort.length > 0) {
        queryParams.sort = '[' + data.sort
            .map((s) => `${s.field}_${s.direction}`)
            .join(',') + ']';
    }
    let filterString = [];
    if (data.conditions && data.conditions.length > 0) {
        for (const condition of data.conditions) {
            let operator = '=';
            switch (condition.condition_type) {
                case 'neq':
                    operator = '=!';
                    break;
                case 'gt':
                    operator = '=>';
                    break;
                case 'lt':
                    operator = '=<';
                    break;
                case 'nin':
                    operator = '=!';
                    break;
            }
            const value = condition.condition_type === 'like'
                ? normalizeSearchLikePattern((_a = condition.value) !== null && _a !== void 0 ? _a : '')
                : `[${String((_b = condition.value) !== null && _b !== void 0 ? _b : '')}]`;
            filterString.push(`filter[${condition.field}]${operator}${value}`);
        }
    }
    const queryString = new URLSearchParams(queryParams)
        .toString()
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']')
        + (filterString.length > 0 ? '&' + filterString.join('&') : '');
    return queryString;
}
function normalizeSearchLikePattern(value) {
    if (value.startsWith('%') && value.endsWith('%')) {
        const inner = value.slice(1, -1);
        return `%[${inner}]%`;
    }
    if (value.startsWith('%')) {
        const inner = value.slice(1);
        return `%[${inner}]`;
    }
    if (value.endsWith('%')) {
        const inner = value.slice(0, -1);
        return `[${inner}]%`;
    }
    return `[${value}]`;
}
function getCustomerOptionalFields() {
    return [
        {
            displayName: 'Default Group Name or ID',
            name: 'id_default_group',
            type: 'options',
            description: 'Choose from the list. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
            typeOptions: {
                loadOptionsMethod: 'getGroups',
            },
            default: '',
        },
        {
            displayName: 'Language Name or ID',
            name: 'id_lang',
            type: 'options',
            description: 'Choose from the list. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
            typeOptions: {
                loadOptionsMethod: 'getLanguages',
            },
            default: '',
        },
        {
            displayName: 'Newsletter Date Added',
            name: 'newsletter_date_add',
            type: 'dateTime',
            default: '',
        },
        {
            displayName: 'Birthday',
            name: 'birthday',
            type: 'dateTime',
            default: '',
        },
        {
            displayName: 'Active',
            name: 'active',
            type: 'boolean',
            default: true,
        },
        {
            displayName: 'Is Guest',
            name: 'is_guest',
            type: 'boolean',
            default: false,
        },
        {
            displayName: 'Shop Name or ID',
            name: 'id_shop',
            type: 'options',
            description: 'Choose from the list. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
            typeOptions: {
                loadOptionsMethod: 'getShops',
            },
            default: '',
        },
    ];
}
function getCustomerFields() {
    return [
        'id',
        'id_default_group',
        'id_lang',
        'newsletter_date_add',
        'ip_registration_newsletter',
        'secure_key',
        'deleted',
        'lastname',
        'firstname',
        'email',
        'id_gender',
        'birthday',
        'newsletter',
        'optin',
        'website',
        'company',
        'siret',
        'ape',
        'outstanding_allow_amount',
        'show_public_prices',
        'id_risk',
        'max_payment_days',
        'active',
        'note',
        'is_guest',
        'id_shop',
        'id_shop_group',
    ];
}
function getProductFields() {
    return [
        'id',
        'id_manufacturer',
        'id_supplier',
        'id_category_default',
        'new',
        'id_default_image',
        'id_default_combination',
        'id_tax_rules_group',
        'position_in_category',
        'manufacturer_name',
        'quantity',
        'type',
        'id_shop_default',
        'reference',
        'width',
        'height',
        'depth',
        'weight',
        'ean13',
        'isbn',
        'upc',
        'mpn',
        'cache_is_pack',
        'cache_has_attachments',
        'is_virtual',
        'state',
        'additional_delivery_times',
        'product_type',
        'on_sale',
        'online_only',
        'ecotax',
        'minimal_quantity',
        'low_stock_threshold',
        'low_stock_alert',
        'price',
        'wholesale_price',
        'unity',
        'unit_price',
        'unit_price_ratio',
        'additional_shipping_cost',
        'customizable',
        'text_fields',
        'uploadable_files',
        'active',
        'redirect_type',
        'id_type_redirected',
        'available_for_order',
        'available_date',
        'show_condition',
        'condition',
        'show_price',
        'indexed',
        'visibility',
        'pack_stock_type',
        'delivery_in_stock',
        'delivery_out_stock',
        'meta_description',
        'meta_keywords',
        'meta_title',
        'link_rewrite',
        'name',
        'description',
        'description_short',
        'available_now',
        'available_later',
    ];
}
function getProductOptionalFields() {
    return [
        {
            displayName: 'Manufacturer Name or ID',
            name: 'id_manufacturer',
            type: 'options',
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
            typeOptions: { loadOptionsMethod: 'getManufacturers' },
            default: '',
        },
        {
            displayName: 'Supplier Name or ID',
            name: 'id_supplier',
            type: 'options',
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
            typeOptions: { loadOptionsMethod: 'getSuppliers' },
            default: '',
        },
        {
            displayName: 'Default Category Name or ID',
            name: 'id_category_default',
            type: 'options',
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
            typeOptions: { loadOptionsMethod: 'getCategories' },
            default: '',
        },
        { displayName: 'Default Image ID', name: 'id_default_image', type: 'number', default: 0 },
        { displayName: 'Default Combination ID', name: 'id_default_combination', type: 'number', default: 0 },
        { displayName: 'Tax Rules Group ID', name: 'id_tax_rules_group', type: 'number', default: 0 },
        { displayName: 'Position in Category', name: 'position_in_category', type: 'number', default: 0, typeOptions: { minValue: 1 } },
        {
            displayName: 'Type',
            name: 'type',
            type: 'options',
            options: [
                { name: 'Standard', value: 'simple' },
                { name: 'Pack', value: 'pack' },
                { name: 'Virtual', value: 'virtual' },
            ],
            default: 'simple',
        },
        { displayName: 'Shop Default ID', name: 'id_shop_default', type: 'number', default: 0 },
        { displayName: 'Reference', name: 'reference', type: 'string', default: '' },
        { displayName: 'Width', name: 'width', type: 'number', default: 0 },
        { displayName: 'Height', name: 'height', type: 'number', default: 0 },
        { displayName: 'Depth', name: 'depth', type: 'number', default: 0 },
        { displayName: 'Weight', name: 'weight', type: 'number', default: 0 },
        { displayName: 'EAN13', name: 'ean13', type: 'string', default: '' },
        { displayName: 'ISBN', name: 'isbn', type: 'string', default: '' },
        { displayName: 'UPC', name: 'upc', type: 'string', default: '' },
        { displayName: 'MPN', name: 'mpn', type: 'string', default: '' },
        { displayName: 'Is Virtual', name: 'is_virtual', type: 'boolean', default: false },
        {
            displayName: 'Additional Delivery Times',
            name: 'additional_delivery_times',
            type: 'options',
            options: [
                { name: 'None', value: 0 },
                { name: 'Use System Default', value: 1 },
                { name: 'Use Product Default', value: 2 },
            ],
            default: 1
        },
        { displayName: 'On Sale', name: 'on_sale', type: 'boolean', default: false },
        { displayName: 'Online Only', name: 'online_only', type: 'boolean', default: false },
        { displayName: 'Ecotax', name: 'ecotax', type: 'number', default: 0 },
        { displayName: 'Minimal Quantity', name: 'minimal_quantity', type: 'number', default: 1 },
        { displayName: 'Low Stock Threshold', name: 'low_stock_threshold', type: 'number', default: 0 },
        { displayName: 'Low Stock Alert', name: 'low_stock_alert', type: 'boolean', default: false },
        { displayName: 'Wholesale Price', name: 'wholesale_price', type: 'number', default: 0 },
        { displayName: 'Unity', name: 'unity', type: 'string', default: '' },
        { displayName: 'Unit Price', name: 'unit_price', type: 'number', default: 0 },
        { displayName: 'Unit Price Ratio', name: 'unit_price_ratio', type: 'number', default: 0 },
        { displayName: 'Additional Shipping Cost', name: 'additional_shipping_cost', type: 'number', default: 0 },
        { displayName: 'Customizable', name: 'customizable', type: 'number', default: 0 },
        { displayName: 'Text Fields', name: 'text_fields', type: 'number', default: 0 },
        { displayName: 'Uploadable Files', name: 'uploadable_files', type: 'number', default: 0 },
        { displayName: 'Active', name: 'active', type: 'options', options: [{ name: 'Enabled', value: 1 }, { name: 'Disabled', value: 0 }], default: 1 },
        {
            displayName: 'Redirect Type',
            name: 'redirect_type',
            type: 'options',
            options: [
                { name: 'Not Found (404)', value: '404' },
                { name: 'Permanent to Category (301)', value: '301-category' },
                { name: 'Temporary to Category (302)', value: '302-category' },
                { name: 'Permanent to Product (301)', value: '301-product' },
                { name: 'Temporary to Product (302)', value: '302-product' },
            ],
            default: '404',
        },
        { displayName: 'Redirected Type ID', name: 'id_type_redirected', type: 'number', default: 0 },
        { displayName: 'Available for Order', name: 'available_for_order', type: 'boolean', default: true },
        { displayName: 'Available Date', name: 'available_date', type: 'dateTime', default: '' },
        { displayName: 'Show Condition', name: 'show_condition', type: 'boolean', default: true },
        {
            displayName: 'Condition',
            name: 'condition',
            type: 'options',
            options: [
                { name: 'New', value: 'new' },
                { name: 'Used', value: 'used' },
                { name: 'Refurbished', value: 'refurbished' },
            ],
            default: 'new',
        },
        { displayName: 'Show Price', name: 'show_price', type: 'boolean', default: true },
        {
            displayName: 'Visibility',
            name: 'visibility',
            type: 'options',
            options: [
                { name: 'Everywhere', value: 'both' },
                { name: 'Catalog Only', value: 'catalog' },
                { name: 'Search Only', value: 'search' },
                { name: 'Nowhere', value: 'none' },
            ],
            default: 'both',
        },
        {
            displayName: 'Pack Stock Type',
            name: 'pack_stock_type',
            type: 'options',
            options: [
                { name: 'Pack Only', value: 0 },
                { name: 'Products Only', value: 1 },
                { name: 'Both Pack and Products', value: 2 },
                { name: 'Use Default Configuration', value: 3 },
            ],
            default: 3,
        },
        { displayName: 'Delivery in Stock', name: 'delivery_in_stock', type: 'string', default: '' },
        { displayName: 'Delivery Out Stock', name: 'delivery_out_stock', type: 'string', default: '' },
    ];
}
function getProductOptionalTranslatableFields() {
    return [
        {
            displayName: 'Meta Description',
            name: 'meta_description',
            type: 'fixedCollection',
            placeholder: 'Add translations',
            default: {},
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    displayName: 'Translations',
                    name: 'translations',
                    values: [
                        {
                            displayName: 'Language Name or ID',
                            name: 'idLang',
                            type: 'options',
                            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                            typeOptions: {
                                loadOptionsMethod: 'getLanguages',
                            },
                            default: '',
                        },
                        {
                            displayName: 'Value',
                            name: 'valueLang',
                            type: 'string',
                            default: '',
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Meta Keywords',
            name: 'meta_keywords',
            type: 'fixedCollection',
            placeholder: 'Add translations',
            default: {},
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    displayName: 'Translations',
                    name: 'translations',
                    values: [
                        {
                            displayName: 'Language Name or ID',
                            name: 'idLang',
                            type: 'options',
                            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                            typeOptions: {
                                loadOptionsMethod: 'getLanguages',
                            },
                            default: '',
                        },
                        {
                            displayName: 'Value',
                            name: 'valueLang',
                            type: 'string',
                            default: '',
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Meta Title',
            name: 'meta_title',
            type: 'fixedCollection',
            placeholder: 'Add translations',
            default: {},
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    displayName: 'Translations',
                    name: 'translations',
                    values: [
                        {
                            displayName: 'Language Name or ID',
                            name: 'idLang',
                            type: 'options',
                            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                            typeOptions: {
                                loadOptionsMethod: 'getLanguages',
                            },
                            default: '',
                        },
                        {
                            displayName: 'Value',
                            name: 'valueLang',
                            type: 'string',
                            default: '',
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Description',
            name: 'description',
            type: 'fixedCollection',
            placeholder: 'Add translations',
            default: {},
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    displayName: 'Translations',
                    name: 'translations',
                    values: [
                        {
                            displayName: 'Language Name or ID',
                            name: 'idLang',
                            type: 'options',
                            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                            typeOptions: {
                                loadOptionsMethod: 'getLanguages',
                            },
                            default: '',
                        },
                        {
                            displayName: 'Value',
                            name: 'valueLang',
                            type: 'string',
                            typeOptions: {
                                rows: 5,
                            },
                            default: '',
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Description Short',
            name: 'description_short',
            type: 'fixedCollection',
            placeholder: 'Add translations',
            default: {},
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    displayName: 'Translations',
                    name: 'translations',
                    values: [
                        {
                            displayName: 'Language Name or ID',
                            name: 'idLang',
                            type: 'options',
                            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                            typeOptions: {
                                loadOptionsMethod: 'getLanguages',
                            },
                            default: '',
                        },
                        {
                            displayName: 'Value',
                            name: 'valueLang',
                            type: 'string',
                            typeOptions: {
                                rows: 5,
                            },
                            default: '',
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Available Now',
            name: 'available_now',
            type: 'fixedCollection',
            placeholder: 'Add translations',
            default: {},
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    displayName: 'Translations',
                    name: 'translations',
                    values: [
                        {
                            displayName: 'Language Name or ID',
                            name: 'idLang',
                            type: 'options',
                            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                            typeOptions: {
                                loadOptionsMethod: 'getLanguages',
                            },
                            default: '',
                        },
                        {
                            displayName: 'Value',
                            name: 'valueLang',
                            type: 'string',
                            default: '',
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Available Later',
            name: 'available_later',
            type: 'fixedCollection',
            placeholder: 'Add translations',
            default: {},
            typeOptions: {
                multipleValues: true,
            },
            options: [
                {
                    displayName: 'Translations',
                    name: 'translations',
                    values: [
                        {
                            displayName: 'Language Name or ID',
                            name: 'idLang',
                            type: 'options',
                            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                            typeOptions: {
                                loadOptionsMethod: 'getLanguages',
                            },
                            default: '',
                        },
                        {
                            displayName: 'Value',
                            name: 'valueLang',
                            type: 'string',
                            default: '',
                        },
                    ],
                },
            ],
        },
    ];
}
function getOrderFields() {
    return [
        'id',
        'id_address_delivery',
        'id_address_invoice',
        'id_cart',
        'id_currency',
        'id_lang',
        'id_customer',
        'id_carrier',
        'current_state',
        'module',
        'invoice_number',
        'invoice_date',
        'delivery_number',
        'delivery_date',
        'valid',
        'shipping_number',
        'note',
        'id_shop_group',
        'id_shop',
        'secure_key',
        'payment',
        'recyclable',
        'gift',
        'gift_message',
        'mobile_theme',
        'total_discounts',
        'total_discounts_tax_incl',
        'total_discounts_tax_excl',
        'total_paid',
        'total_paid_tax_incl',
        'total_paid_tax_excl',
        'total_paid_real',
        'total_products',
        'total_products_wt',
        'total_shipping',
        'total_shipping_tax_incl',
        'total_shipping_tax_excl',
        'carrier_tax_rate',
        'total_wrapping',
        'total_wrapping_tax_incl',
        'total_wrapping_tax_excl',
        'round_mode',
        'round_type',
        'conversion_rate',
        'reference',
    ];
}
function getSpecificPriceFields() {
    return [
        'id',
        'id_shop_group',
        'id_shop',
        'id_cart',
        'id_product',
        'id_product_attribute',
        'id_currency',
        'id_country',
        'id_group',
        'id_customer',
        'id_specific_price_rule',
        'price',
        'from_quantity',
        'reduction',
        'reduction_tax',
        'reduction_type',
        'from',
        'to'
    ];
}
function getCartRuleFields() {
    return [
        'id',
        'id_customer',
        'date_from',
        'date_to',
        'description',
        'quantity',
        'quantity_per_user',
        'priority',
        'partial_use',
        'code',
        'minimum_amount',
        'minimum_amount_tax',
        'minimum_amount_currency',
        'minimum_amount_shipping',
        'country_restriction',
        'carrier_restriction',
        'group_restriction',
        'cart_rule_restriction',
        'product_restriction',
        'shop_restriction',
        'free_shipping',
        'reduction_percent',
        'reduction_amount',
        'reduction_tax',
        'reduction_currency',
        'reduction_product',
        'reduction_exclude_special',
        'gift_product',
        'gift_product_attribute',
        'highlight',
        'active',
        'name'
    ];
}
let cachedDefaultLanguage = '';
async function getDefaultLanguage() {
    if (cachedDefaultLanguage) {
        return cachedDefaultLanguage;
    }
    const response = await qloappsHotelApiRequest.call(this, 'GET', '/configurations', {}, 'filter[name]=[PS_LANG_DEFAULT]&display=full');
    const languageConfigurations = response['configurations'] || [];
    for (const conf of languageConfigurations) {
        cachedDefaultLanguage = conf.value;
        return conf.value;
    }
    return '';
}
async function checkMultishop() {
    const response = await qloappsHotelApiRequest.call(this, 'GET', '/configurations', {}, 'filter[name]=[PS_MULTISHOP_FEATURE_ACTIVE]&display=full');
    const languageConfigurations = response['configurations'] || [];
    for (const conf of languageConfigurations) {
        return [{ name: 'Is Multishop', value: conf.value ? true : false }];
    }
    return [{ name: 'Is Multishop', value: false }];
}
const sort = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
};
exports.sort = sort;
function buildMultilangField(field) {
    if (!field || !Array.isArray(field.translations))
        return [];
    return field.translations.map(({ idLang, valueLang }) => ({
        '@_id': idLang,
        '__cdata': valueLang,
    }));
}
//# sourceMappingURL=GenericFunctions.js.map