"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QloAppsHotel = void 0;
const change_case_1 = require("change-case");
const fast_xml_parser_1 = require("fast-xml-parser");
const n8n_workflow_1 = require("n8n-workflow");
const GenericFunctions_1 = require("./GenericFunctions");
const CustomerDescription_1 = require("./CustomerDescription");
const OrderDescription_1 = require("./OrderDescription");
const ProductDescription_1 = require("./ProductDescription");
const SpecificPriceDescription_1 = require("./SpecificPriceDescription");
const CartRuleDescription_1 = require("./CartRuleDescription");
let cachedLanguages = null;
class QloAppsHotel {
    constructor() {
        this.description = {
            displayName: 'QloApps Hotel',
            name: "qloappsHotel",
            icon: "file:qloapps-hotel.svg",
            group: ['input'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: "Consume QloApps Hotel API",
            defaults: {
                name: "QloApps Hotel",
            },
            usableAsTool: true,
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: "qloappsHotelApi",
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Addresses',
                            value: 'addresses',
                        },
                        {
                            name: 'Advance Payments',
                            value: 'advance_payments',
                        },
                        {
                            name: 'Booking Extra Demands',
                            value: 'booking_extra_demands',
                        },
                        {
                            name: 'Bookings',
                            value: 'bookings',
                        },
                        {
                            name: 'Carriers',
                            value: 'carriers',
                        },
                        {
                            name: 'Cart Bookings',
                            value: 'cart_bookings',
                        },
                        {
                            name: 'Cart Rules',
                            value: 'cart_rules',
                        },
                        {
                            name: 'Carts',
                            value: 'carts',
                        },
                        {
                            name: 'Categories',
                            value: 'categories',
                        },
                        {
                            name: 'Combinations',
                            value: 'combinations',
                        },
                        {
                            name: 'Configurations',
                            value: 'configurations',
                        },
                        {
                            name: 'Contacts',
                            value: 'contacts',
                        },
                        {
                            name: 'Content Management System',
                            value: 'content_management_system',
                        },
                        {
                            name: 'Countries',
                            value: 'countries',
                        },
                        {
                            name: 'Currencies',
                            value: 'currencies',
                        },
                        {
                            name: 'Customer Messages',
                            value: 'customer_messages',
                        },
                        {
                            name: 'Customer Threads',
                            value: 'customer_threads',
                        },
                        {
                            name: 'Customers',
                            value: 'customers',
                        },
                        {
                            name: 'Customizations',
                            value: 'customizations',
                        },
                        {
                            name: 'Deliveries',
                            value: 'deliveries',
                        },
                        {
                            name: 'Demand Advance Options',
                            value: 'demand_advance_options',
                        },
                        {
                            name: 'Employees',
                            value: 'employees',
                        },
                        {
                            name: 'Extra Demands',
                            value: 'extra_demands',
                        },
                        {
                            name: 'Feature Prices',
                            value: 'feature_prices',
                        },
                        {
                            name: 'Groups',
                            value: 'groups',
                        },
                        {
                            name: 'Guests',
                            value: 'guests',
                        },
                        {
                            name: 'Hotel ARI',
                            value: 'hotel_ari',
                        },
                        {
                            name: 'Hotel Features',
                            value: 'hotel_features',
                        },
                        {
                            name: 'Hotel Refund Rules',
                            value: 'hotel_refund_rules',
                        },
                        {
                            name: 'Hotel Room Types',
                            value: 'hotel_room_types',
                        },
                        {
                            name: 'Hotel Rooms',
                            value: 'hotel_rooms',
                        },
                        {
                            name: 'Hotels',
                            value: 'hotels',
                        },
                        {
                            name: 'Image Types',
                            value: 'image_types',
                        },
                        {
                            name: 'Images',
                            value: 'images',
                        },
                        {
                            name: 'Languages',
                            value: 'languages',
                        },
                        {
                            name: 'Manufacturers',
                            value: 'manufacturers',
                        },
                        {
                            name: 'Order Carriers',
                            value: 'order_carriers',
                        },
                        {
                            name: 'Order Details',
                            value: 'order_details',
                        },
                        {
                            name: 'Order Discounts',
                            value: 'order_discounts',
                        },
                        {
                            name: 'Order Histories',
                            value: 'order_histories',
                        },
                        {
                            name: 'Order Invoices',
                            value: 'order_invoices',
                        },
                        {
                            name: 'Order Payments',
                            value: 'order_payments',
                        },
                        {
                            name: 'Order Slip',
                            value: 'order_slip',
                        },
                        {
                            name: 'Order States',
                            value: 'order_states',
                        },
                        {
                            name: 'Orders',
                            value: 'orders',
                        },
                        {
                            name: 'Price Ranges',
                            value: 'price_ranges',
                        },
                        {
                            name: 'Product Customization Fields',
                            value: 'product_customization_fields',
                        },
                        {
                            name: 'Product Suppliers',
                            value: 'product_suppliers',
                        },
                        {
                            name: 'Room Bookings',
                            value: 'room_bookings',
                        },
                        {
                            name: 'Room Type Feature Values',
                            value: 'room_type_feature_values',
                        },
                        {
                            name: 'Room Type Features',
                            value: 'room_type_features',
                        },
                        {
                            name: 'Room Type Option Values',
                            value: 'room_type_option_values',
                        },
                        {
                            name: 'Room Type Options',
                            value: 'room_type_options',
                        },
                        {
                            name: 'Room Types',
                            value: 'room_types',
                        },
                        {
                            name: 'Search',
                            value: 'search',
                        },
                        {
                            name: 'Services',
                            value: 'services',
                        },
                        {
                            name: 'Shop Groups',
                            value: 'shop_groups',
                        },
                        {
                            name: 'Shop URLs',
                            value: 'shop_urls',
                        },
                        {
                            name: 'Shops',
                            value: 'shops',
                        },
                        {
                            name: 'Specific Price Rules',
                            value: 'specific_price_rules',
                        },
                        {
                            name: 'Specific Prices',
                            value: 'specific_prices',
                        },
                        {
                            name: 'States',
                            value: 'states',
                        },
                        {
                            name: 'Stock Availables',
                            value: 'stock_availables',
                        },
                        {
                            name: 'Stock Movement Reasons',
                            value: 'stock_movement_reasons',
                        },
                        {
                            name: 'Stock Movements',
                            value: 'stock_movements',
                        },
                        {
                            name: 'Stocks',
                            value: 'stocks',
                        },
                        {
                            name: 'Stores',
                            value: 'stores',
                        },
                        {
                            name: 'Suppliers',
                            value: 'suppliers',
                        },
                        {
                            name: 'Supply Order Details',
                            value: 'supply_order_details',
                        },
                        {
                            name: 'Supply Order Histories',
                            value: 'supply_order_histories',
                        },
                        {
                            name: 'Supply Order Receipt Histories',
                            value: 'supply_order_receipt_histories',
                        },
                        {
                            name: 'Supply Order States',
                            value: 'supply_order_states',
                        },
                        {
                            name: 'Supply Orders',
                            value: 'supply_orders',
                        },
                        {
                            name: 'Tags',
                            value: 'tags',
                        },
                        {
                            name: 'Tax Rule Groups',
                            value: 'tax_rule_groups',
                        },
                        {
                            name: 'Tax Rules',
                            value: 'tax_rules',
                        },
                        {
                            name: 'Taxes',
                            value: 'taxes',
                        },
                        {
                            name: 'Translated Configurations',
                            value: 'translated_configurations',
                        },
                        {
                            name: 'Warehouse Product Locations',
                            value: 'warehouse_product_locations',
                        },
                        {
                            name: 'Warehouses',
                            value: 'warehouses',
                        },
                        {
                            name: 'Weight Ranges',
                            value: 'weight_ranges',
                        },
                        {
                            name: 'Zones',
                            value: 'zones',
                        },
                    ],
                    default: 'customers',
                },
                {
                    displayName: 'Output Format',
                    name: 'output',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'JSON',
                            value: 'JSON',
                        },
                        {
                            name: 'XML',
                            value: 'XML',
                        },
                    ],
                    default: 'JSON',
                },
                ...CartRuleDescription_1.cartRuleOperations,
                ...CartRuleDescription_1.cartRuleFields,
                ...CustomerDescription_1.customerOperations,
                ...CustomerDescription_1.customerFields,
                ...OrderDescription_1.orderOperations,
                ...OrderDescription_1.orderFields,
                ...ProductDescription_1.productOperations,
                ...ProductDescription_1.productFields,
                ...SpecificPriceDescription_1.specificPriceOperations,
                ...SpecificPriceDescription_1.specificPriceFields
            ],
        };
        this.methods = {
            loadOptions: {
                async getLanguages() {
                    if (cachedLanguages) {
                        return cachedLanguages;
                    }
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'languages', {}, 'display=full');
                    const languages = response['languages'] || [];
                    const returnData = [];
                    for (const lang of languages) {
                        returnData.push({
                            name: lang.name,
                            value: lang.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    cachedLanguages = returnData;
                    return returnData;
                },
                async getGroups() {
                    const language = await GenericFunctions_1.getDefaultLanguage.call(this);
                    const group = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', '/groups', {}, 'language=' + language + '&display=full');
                    const returnData = [];
                    returnData.push({
                        name: group.name,
                        value: group.id,
                    });
                    returnData.sort(GenericFunctions_1.sort);
                    return returnData;
                },
                async getShops() {
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'shops', {}, 'display=full');
                    const shops = response['shops'] || [];
                    const returnData = [];
                    for (const shop of shops) {
                        returnData.push({
                            name: shop.name,
                            value: shop.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    return returnData;
                },
                async getShopGroups() {
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'shop_groups', {}, 'display=full');
                    const shop_groups = response['shop_groups'] || [];
                    const returnData = [];
                    for (const shop_group of shop_groups) {
                        returnData.push({
                            name: shop_group.name,
                            value: shop_group.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    return returnData;
                },
                async getCategories() {
                    const language = await GenericFunctions_1.getDefaultLanguage.call(this);
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'categories', {}, 'language=' + language + '&display=full');
                    const categories = response['categories'] || [];
                    const returnData = [];
                    for (const category of categories) {
                        returnData.push({
                            name: category.name,
                            value: category.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    return returnData;
                },
                async getOrderStates() {
                    const language = await GenericFunctions_1.getDefaultLanguage.call(this);
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'order_states', {}, 'language=' + language + '&display=full');
                    const order_states = response['order_states'] || [];
                    const returnData = [];
                    for (const os of order_states) {
                        returnData.push({
                            name: os.name,
                            value: os.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    return returnData;
                },
                async getManufacturers() {
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'manufacturers', {}, 'display=full');
                    const manufacturers = response['manufacturers'] || [];
                    const returnData = [];
                    for (const manufacturer of manufacturers) {
                        returnData.push({
                            name: manufacturer.name,
                            value: manufacturer.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    return returnData;
                },
                async getSuppliers() {
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'suppliers', {}, 'display=full');
                    const suppliers = response['suppliers'] || [];
                    const returnData = [];
                    for (const supplier of suppliers) {
                        returnData.push({
                            name: supplier.name,
                            value: supplier.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    return returnData;
                },
                async getCurrencies() {
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'currencies', {}, 'display=full&filter[active]=[1]');
                    const currencies = response['currencies'] || [];
                    const returnData = [];
                    for (const currency of currencies) {
                        returnData.push({
                            name: `${currency.name} (${currency.iso_code})`,
                            value: currency.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    returnData.unshift({ name: 'All currencies', value: 0 });
                    return returnData;
                },
                async getCountries() {
                    const language = await GenericFunctions_1.getDefaultLanguage.call(this);
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'countries', {}, `language=${language}&display=full`);
                    const countries = response['countries'] || [];
                    const returnData = [];
                    for (const country of countries) {
                        returnData.push({
                            name: country.name,
                            value: country.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    returnData.unshift({ name: 'All countries', value: 0 });
                    return returnData;
                },
                async getCustomerGroups() {
                    const language = await GenericFunctions_1.getDefaultLanguage.call(this);
                    const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'groups', {}, `language=${language}&display=full`);
                    const groups = response['groups'] || [];
                    const returnData = [];
                    for (const group of groups) {
                        returnData.push({
                            name: group.name,
                            value: group.id,
                        });
                    }
                    returnData.sort(GenericFunctions_1.sort);
                    returnData.unshift({ name: 'All groups', value: 0 });
                    return returnData;
                },
                async getProductAttributes() {
                    return (0, GenericFunctions_1.getProductFields)()
                        .map((field) => ({ name: (0, change_case_1.capitalCase)(field), value: field }))
                        .sort(GenericFunctions_1.sort);
                },
                async getOrderAttributes() {
                    return (0, GenericFunctions_1.getOrderFields)()
                        .map((field) => ({ name: (0, change_case_1.capitalCase)(field), value: field }))
                        .sort(GenericFunctions_1.sort);
                },
                async getCustomerAttributes() {
                    return (0, GenericFunctions_1.getCustomerFields)()
                        .map((field) => ({ name: (0, change_case_1.capitalCase)(field), value: field }))
                        .sort(GenericFunctions_1.sort);
                },
                async getSpecificPriceAttributes() {
                    return (0, GenericFunctions_1.getSpecificPriceFields)()
                        .map((field) => ({ name: (0, change_case_1.capitalCase)(field), value: field }))
                        .sort(GenericFunctions_1.sort);
                },
                async getCartRuleAttributes() {
                    return (0, GenericFunctions_1.getCartRuleFields)()
                        .map((field) => ({ name: (0, change_case_1.capitalCase)(field), value: field }))
                        .sort(GenericFunctions_1.sort);
                },
            },
        };
    }
    async execute() {
        var _a;
        const items = this.getInputData();
        const returnData = [];
        const length = items.length;
        let responseData;
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < length; i++) {
            try {
                if (resource === 'cart_rule') {
                    if (operation === 'create') {
                        const nameTranslations = this.getNodeParameter('information.fields.name', i);
                        const description = this.getNodeParameter('information.fields.description', i, '');
                        const code = this.getNodeParameter('information.fields.code', i, '');
                        const highlight = this.getNodeParameter('information.fields.highlight', i, false);
                        const partialUse = this.getNodeParameter('information.fields.partial_use', i, false);
                        const priority = this.getNodeParameter('information.fields.priority', i, 1);
                        const active = this.getNodeParameter('information.fields.active', i, true);
                        const idCustomer = this.getNodeParameter('conditions.fields.id_customer', i, 0);
                        const dateFrom = this.getNodeParameter('conditions.fields.date_from', i, '');
                        const dateTo = this.getNodeParameter('conditions.fields.date_to', i, '');
                        const minimumAmount = this.getNodeParameter('conditions.fields.minimum_amount', i, 0);
                        const minimumAmountCurrency = this.getNodeParameter('conditions.fields.minimum_amount_currency', i, 0);
                        const minimumAmountTax = this.getNodeParameter('conditions.fields.minimum_amount_tax', i, false);
                        const minimumAmountShipping = this.getNodeParameter('conditions.fields.minimum_amount_shipping', i, false);
                        const quantity = this.getNodeParameter('conditions.fields.quantity', i, 1);
                        const quantityPerUser = this.getNodeParameter('conditions.fields.quantity_per_user', i, 1);
                        const freeShipping = this.getNodeParameter('actions.fields.free_shipping', i, false);
                        const applyDiscount = this.getNodeParameter('actions.fields.apply_discount', i, 'off');
                        const reductionPercent = this.getNodeParameter('actions.fields.reduction_percent', i, 0);
                        const reductionAmount = this.getNodeParameter('actions.fields.reduction_amount', i, 0);
                        const reductionCurrency = this.getNodeParameter('actions.fields.reduction_currency', i, 0);
                        const reductionTax = this.getNodeParameter('actions.fields.reduction_tax', i, true);
                        const applyDiscountTo = this.getNodeParameter('actions.fields.apply_discount_to', i, 'order');
                        const reductionProduct = this.getNodeParameter('actions.fields.reduction_product', i, 0);
                        const reductionExcludeSpecial = this.getNodeParameter('actions.fields.reduction_exclude_special', i, false);
                        const freeGift = this.getNodeParameter('actions.fields.free_gift', i, false);
                        const giftProduct = this.getNodeParameter('actions.fields.gift_product', i, 0);
                        const giftProductAttribute = this.getNodeParameter('actions.fields.gift_product_attribute', i, 0);
                        const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', `cart_rules`, {}, 'schema=blank');
                        const cartRuleData = Array.isArray(response.cart_rule)
                            ? { ...response.cart_rule }
                            : (response.cart_rule || {});
                        cartRuleData.name = { language: (0, GenericFunctions_1.buildMultilangField)(nameTranslations) };
                        cartRuleData.description = description;
                        cartRuleData.code = code;
                        cartRuleData.highlight = highlight ? '1' : '0';
                        cartRuleData.partial_use = partialUse ? '1' : '0';
                        cartRuleData.priority = priority;
                        cartRuleData.active = active ? '1' : '0';
                        cartRuleData.id_customer = idCustomer;
                        cartRuleData.date_from = dateFrom;
                        cartRuleData.date_to = dateTo;
                        cartRuleData.minimum_amount = minimumAmount;
                        cartRuleData.minimum_amount_currency = minimumAmountCurrency;
                        cartRuleData.minimum_amount_tax = minimumAmountTax ? '1' : '0';
                        cartRuleData.minimum_amount_shipping = minimumAmountShipping ? '1' : '0';
                        cartRuleData.quantity = quantity;
                        cartRuleData.quantity_per_user = quantityPerUser;
                        cartRuleData.free_shipping = freeShipping ? '1' : '0';
                        if (applyDiscount === 'percent') {
                            cartRuleData.reduction_percent = reductionPercent;
                            cartRuleData.reduction_amount = 0;
                            cartRuleData.reduction_currency = 0;
                            cartRuleData.reduction_tax = '0';
                        }
                        else if (applyDiscount === 'amount') {
                            cartRuleData.reduction_percent = 0;
                            cartRuleData.reduction_amount = reductionAmount;
                            cartRuleData.reduction_currency = reductionCurrency;
                            cartRuleData.reduction_tax = reductionTax ? '1' : '0';
                        }
                        else {
                            cartRuleData.reduction_percent = 0;
                            cartRuleData.reduction_amount = 0;
                            cartRuleData.reduction_currency = 0;
                            cartRuleData.reduction_tax = '0';
                        }
                        cartRuleData.reduction_product = (applyDiscountTo === 'specific') ? reductionProduct : 0;
                        cartRuleData.reduction_exclude_special = reductionExcludeSpecial ? '1' : '0';
                        cartRuleData.gift_product = freeGift ? giftProduct : 0;
                        cartRuleData.gift_product_attribute = freeGift ? giftProductAttribute : 0;
                        ['date_add', 'date_upd'].forEach((prop) => delete cartRuleData[prop]);
                        for (const key of Object.keys(cartRuleData)) {
                            if (typeof cartRuleData[key] === 'boolean') {
                                cartRuleData[key] = cartRuleData[key] ? '1' : '0';
                            }
                            else if (typeof cartRuleData[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(cartRuleData[key])) {
                                cartRuleData[key] = cartRuleData[key].replace('T', ' ');
                            }
                        }
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false, cdataPropName: '__cdata' });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { cart_rule: cartRuleData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'POST', 'cart_rules', body);
                    }
                    if (operation === 'delete') {
                        const cartRuleId = this.getNodeParameter('cartRuleId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'DELETE', `cart_rules/${cartRuleId}`);
                        responseData = { success: true };
                    }
                    if (operation === 'get') {
                        const cartRuleId = this.getNodeParameter('cartRuleId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', `cart_rules/${cartRuleId}`);
                    }
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', 0);
                        const filterType = this.getNodeParameter('filterType', i);
                        const sortOption = this.getNodeParameter('options.sort', i, {});
                        let qs = '';
                        if (filterType === 'manual') {
                            const filters = this.getNodeParameter('filters', i);
                            qs = (0, GenericFunctions_1.getFilterQuery)({
                                ...filters,
                                ...sortOption,
                                limit: limit,
                            });
                        }
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'cart_rules', {}, qs);
                    }
                }
                if (resource === 'customer') {
                    if (operation === 'create') {
                        const email = this.getNodeParameter('email', i);
                        const firstname = this.getNodeParameter('firstname', i);
                        const lastname = this.getNodeParameter('lastname', i);
                        const passwd = this.getNodeParameter('passwd', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', `customers`, {}, 'schema=blank');
                        const customerData = response.customer || {};
                        if (email)
                            customerData.email = email;
                        if (firstname)
                            customerData.firstname = firstname;
                        if (lastname)
                            customerData.lastname = lastname;
                        if (passwd)
                            customerData.passwd = passwd;
                        Object.assign(customerData, additionalFields);
                        ['associations', 'date_add', 'date_upd'].forEach((prop) => delete customerData[prop]);
                        for (const key of Object.keys(customerData)) {
                            if (typeof customerData[key] === 'boolean') {
                                customerData[key] = customerData[key] ? '1' : '0';
                            }
                            else if (typeof customerData[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(customerData[key])) {
                                customerData[key] = customerData[key].replace('T', ' ');
                            }
                        }
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { customer: customerData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'POST', 'customers', body);
                    }
                    if (operation === 'delete') {
                        const customerId = this.getNodeParameter('customerId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'DELETE', `customers/${customerId}`);
                        responseData = { success: true };
                    }
                    if (operation === 'get') {
                        const customerId = this.getNodeParameter('customerId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', `customers/${customerId}`);
                    }
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', 0);
                        const filterType = this.getNodeParameter('filterType', i);
                        const sortOption = this.getNodeParameter('options.sort', i, {});
                        let qs = '';
                        if (filterType === 'manual') {
                            const filters = this.getNodeParameter('filters', i);
                            qs = (0, GenericFunctions_1.getFilterQuery)({
                                ...filters,
                                ...sortOption,
                                limit: limit,
                            });
                        }
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'customers', {}, qs);
                    }
                    if (operation === 'update') {
                        const customerId = this.getNodeParameter('customerId', i);
                        const email = this.getNodeParameter('email', i);
                        const firstname = this.getNodeParameter('firstname', i);
                        const lastname = this.getNodeParameter('lastname', i);
                        const passwd = this.getNodeParameter('passwd', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const customerData = {};
                        customerData.id = customerId;
                        if (email)
                            customerData.email = email;
                        if (firstname)
                            customerData.firstname = firstname;
                        if (lastname)
                            customerData.lastname = lastname;
                        if (passwd)
                            customerData.passwd = passwd;
                        Object.assign(customerData, additionalFields);
                        for (const key of Object.keys(customerData)) {
                            if (typeof customerData[key] === 'boolean') {
                                customerData[key] = customerData[key] ? '1' : '0';
                            }
                            else if (typeof customerData[key] === 'string') {
                                if (key === 'birthday') {
                                    customerData[key] = customerData[key].split('T')[0];
                                }
                                else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(customerData[key])) {
                                    customerData[key] = customerData[key].replace('T', ' ');
                                }
                            }
                        }
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { customer: customerData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'PATCH', `customers/${customerId}`, body);
                    }
                }
                if (resource === 'order') {
                    if (operation === 'delete') {
                        const orderId = this.getNodeParameter('orderId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'DELETE', `orders/${orderId}`);
                        responseData = { success: true };
                    }
                    if (operation === 'get') {
                        const orderId = this.getNodeParameter('orderId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', `orders/${orderId}`);
                    }
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', 0);
                        const filterType = this.getNodeParameter('filterType', i);
                        const sortOption = this.getNodeParameter('options.sort', i, {});
                        let qs = '';
                        if (filterType === 'manual') {
                            const filters = this.getNodeParameter('filters', i);
                            qs = (0, GenericFunctions_1.getFilterQuery)({
                                ...filters,
                                ...sortOption,
                                limit: limit,
                            });
                        }
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'orders', {}, qs);
                    }
                    if (operation === 'changeStatus') {
                        const orderId = this.getNodeParameter('orderId', i);
                        const orderStateId = this.getNodeParameter('orderStateId', i);
                        const orderData = {};
                        orderData.id = orderId;
                        orderData.current_state = orderStateId;
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { order: orderData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'PATCH', `orders/${orderId}`, body);
                    }
                    if (operation === 'shippingNumber') {
                        const orderId = this.getNodeParameter('orderId', i);
                        const orderShippingNumber = this.getNodeParameter('orderShippingNumber', i);
                        const orderData = {};
                        orderData.id = orderId;
                        orderData.shipping_number = orderShippingNumber;
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { order: orderData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'PATCH', `orders/${orderId}`, body);
                    }
                    if (operation === 'orderNote') {
                        const orderId = this.getNodeParameter('orderId', i);
                        const note = this.getNodeParameter('orderNoteMessage', i);
                        const orderData = {};
                        orderData.id = orderId;
                        orderData.note = note;
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { order: orderData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'PATCH', `orders/${orderId}`, body);
                    }
                }
                if (resource === 'product') {
                    if (operation === 'create') {
                        const nameTranslations = this.getNodeParameter('name', i);
                        const linkRewriteTranslations = this.getNodeParameter('linkRewrite', i);
                        const price = this.getNodeParameter('price', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const translationFields = this.getNodeParameter('translationFields', i);
                        const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', `products`, {}, 'schema=blank');
                        const productData = response.product || {};
                        productData.name = { language: (0, GenericFunctions_1.buildMultilangField)(nameTranslations) };
                        productData.link_rewrite = { language: (0, GenericFunctions_1.buildMultilangField)(linkRewriteTranslations) };
                        productData.price = price;
                        productData.state = 1;
                        if (translationFields) {
                            for (const [key, value] of Object.entries(translationFields)) {
                                if (value &&
                                    typeof value === 'object' &&
                                    Array.isArray(value.translations)) {
                                    productData[key] = { language: (0, GenericFunctions_1.buildMultilangField)(value) };
                                }
                            }
                        }
                        Object.assign(productData, additionalFields);
                        [
                            'associations',
                            'date_add',
                            'date_upd',
                            'cache_default_attribute',
                            'supplier_reference',
                            'location',
                            'quantity_discount'
                        ].forEach((prop) => delete productData[prop]);
                        for (const key of Object.keys(productData)) {
                            if (typeof productData[key] === 'boolean') {
                                productData[key] = productData[key] ? '1' : '0';
                            }
                            else if (typeof productData[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(productData[key])) {
                                productData[key] = productData[key].replace('T', ' ');
                            }
                        }
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false, cdataPropName: '__cdata' });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { product: productData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'POST', 'products', body);
                    }
                    if (operation === 'delete') {
                        const productId = this.getNodeParameter('productId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'DELETE', `products/${productId}`);
                        responseData = { success: true };
                    }
                    if (operation === 'get') {
                        const productId = this.getNodeParameter('productId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', `products/${productId}`);
                    }
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', 0);
                        const filterType = this.getNodeParameter('filterType', i);
                        const sortOption = this.getNodeParameter('options.sort', i, {});
                        let qs = '';
                        if (filterType === 'manual') {
                            const filters = this.getNodeParameter('filters', i);
                            qs = (0, GenericFunctions_1.getFilterQuery)({
                                ...filters,
                                ...sortOption,
                                limit: limit,
                            });
                        }
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'products', {}, qs);
                    }
                    if (operation === 'update') {
                        const productId = this.getNodeParameter('productId', i);
                        const nameTranslations = this.getNodeParameter('name', i);
                        const linkRewriteTranslations = this.getNodeParameter('linkRewrite', i);
                        const price = this.getNodeParameter('price', i);
                        const translationFields = this.getNodeParameter('translationFields', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const productData = {};
                        productData.id = productId;
                        if (nameTranslations && Array.isArray(nameTranslations.translations))
                            productData.name = { language: (0, GenericFunctions_1.buildMultilangField)(nameTranslations) };
                        if (linkRewriteTranslations && Array.isArray(linkRewriteTranslations.translations))
                            productData.link_rewrite = { language: (0, GenericFunctions_1.buildMultilangField)(linkRewriteTranslations) };
                        if (price && price > 0)
                            productData.price = price;
                        if (translationFields) {
                            for (const [key, value] of Object.entries(translationFields)) {
                                if (value &&
                                    typeof value === 'object' &&
                                    Array.isArray(value.translations)) {
                                    productData[key] = { language: (0, GenericFunctions_1.buildMultilangField)(value) };
                                }
                            }
                        }
                        Object.assign(productData, additionalFields);
                        for (const key of Object.keys(productData)) {
                            if (typeof productData[key] === 'boolean') {
                                productData[key] = productData[key] ? '1' : '0';
                            }
                            else if (typeof productData[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(productData[key])) {
                                productData[key] = productData[key].replace('T', ' ');
                            }
                        }
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false, cdataPropName: '__cdata' });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { product: productData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'PATCH', `products/${productId}`, body);
                    }
                    if (operation === 'stock') {
                        const searchMode = this.getNodeParameter('searchMode', i);
                        const quantity = this.getNodeParameter('quantity', i);
                        let stockId = null;
                        if (searchMode === 'byStockId') {
                            stockId = this.getNodeParameter('stockId', i);
                        }
                        else if (searchMode === 'byCombination') {
                            const productId = this.getNodeParameter('productId', i);
                            const combinationId = this.getNodeParameter('combinationId', i);
                            const isMultishop = this.getNodeParameter('isMultishop', i, false);
                            let query = `filter[id_product]=[${productId}]&filter[id_product_attribute]=[${combinationId}]`;
                            if (isMultishop) {
                                const shopId = this.getNodeParameter('shopId', i);
                                const idShopGroup = this.getNodeParameter('shopGroupId', i);
                                query += `&filter[id_shop]=[${shopId}]&filter[id_shop_group]=[${idShopGroup}]`;
                            }
                            const stockResponse = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'stock_availables', {}, query);
                            if (((_a = stockResponse === null || stockResponse === void 0 ? void 0 : stockResponse.stock_availables) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                                stockId = parseInt(stockResponse.stock_availables[0].id, 10);
                            }
                            else {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `No stock records were found with these parameters.`);
                            }
                        }
                        if (!stockId) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'No valid stock record identifier found.');
                        }
                        const stockData = {
                            id: stockId,
                            quantity,
                        };
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { stock_available: stockData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'PATCH', `stock_availables/${stockId}`, body);
                    }
                }
                if (resource === 'specific_price') {
                    if (operation === 'create') {
                        const productId = this.getNodeParameter('productId', i);
                        const combinationId = this.getNodeParameter('combinationId', i, 0);
                        const currencyId = this.getNodeParameter('currencyId', i, 0);
                        const countryId = this.getNodeParameter('countryId', i, 0);
                        const groupId = this.getNodeParameter('groupId', i, 0);
                        const customerId = this.getNodeParameter('customerId', i, 0);
                        const fromQuantity = this.getNodeParameter('fromQuantity', i, 1);
                        const isMultishop = this.getNodeParameter('isMultishop', i, false);
                        const unlimitedDuration = this.getNodeParameter('unlimitedDuration', i, true);
                        let fromDate = '0000-00-00 00:00:00';
                        let toDate = '0000-00-00 00:00:00';
                        if (!unlimitedDuration) {
                            fromDate = this.getNodeParameter('fromDate', i);
                            toDate = this.getNodeParameter('toDate', i);
                        }
                        const impactMode = this.getNodeParameter('impactMode', i);
                        let reduction = 0;
                        let reductionTax = 1;
                        let reductionType = 'amount';
                        let fixedPrice = -1;
                        if (impactMode === 'discount') {
                            reduction = this.getNodeParameter('reductionValue', i);
                            reductionTax = this.getNodeParameter('reductionIncludeTax', i, 1);
                            reductionType = this.getNodeParameter('reductionType', i, 'amount');
                            if (reductionType === 'percentage') {
                                reduction /= 100;
                            }
                            fixedPrice = -1;
                        }
                        else if (impactMode === 'fixedPrice') {
                            reduction = 0;
                            reductionTax = 1;
                            reductionType = 'amount';
                            fixedPrice = this.getNodeParameter('fixedPriceTaxExcluded', i);
                        }
                        const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', `specific_prices`, {}, 'schema=blank');
                        const specificPriceData = Array.isArray(response.specific_price)
                            ? { ...response.specific_price }
                            : (response.specific_price || {});
                        specificPriceData.id_product = productId;
                        specificPriceData.id_product_attribute = combinationId;
                        specificPriceData.id_cart = 0;
                        specificPriceData.id_currency = currencyId;
                        specificPriceData.id_country = countryId;
                        specificPriceData.id_group = groupId;
                        specificPriceData.id_customer = customerId;
                        specificPriceData.from_quantity = fromQuantity;
                        specificPriceData.from = fromDate;
                        specificPriceData.to = toDate;
                        specificPriceData.price = fixedPrice;
                        specificPriceData.reduction = reduction;
                        specificPriceData.reduction_tax = reductionTax;
                        specificPriceData.reduction_type = reductionType;
                        if (isMultishop) {
                            const shopId = this.getNodeParameter('shopId', i, 0);
                            const shopGroupId = this.getNodeParameter('shopGroupId', i, 0);
                            specificPriceData.id_shop = shopId;
                            specificPriceData.id_shop_group = shopGroupId;
                        }
                        for (const key of Object.keys(specificPriceData)) {
                            if (typeof specificPriceData[key] === 'boolean') {
                                specificPriceData[key] = specificPriceData[key] ? '1' : '0';
                            }
                            else if (typeof specificPriceData[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(specificPriceData[key])) {
                                specificPriceData[key] = specificPriceData[key].replace('T', ' ');
                            }
                        }
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { specific_price: specificPriceData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'POST', 'specific_prices', body);
                    }
                    if (operation === 'delete') {
                        const specificPriceId = this.getNodeParameter('specificPriceId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'DELETE', `specific_prices/${specificPriceId}`);
                        responseData = { success: true };
                    }
                    if (operation === 'get') {
                        const specificPriceId = this.getNodeParameter('specificPriceId', i);
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', `specific_prices/${specificPriceId}`);
                    }
                    if (operation === 'getAll') {
                        const limit = this.getNodeParameter('limit', 0);
                        const filterType = this.getNodeParameter('filterType', i);
                        const sortOption = this.getNodeParameter('options.sort', i, {});
                        let qs = '';
                        if (filterType === 'manual') {
                            const filters = this.getNodeParameter('filters', i);
                            qs = (0, GenericFunctions_1.getFilterQuery)({
                                ...filters,
                                ...sortOption,
                                limit: limit,
                            });
                        }
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', 'specific_prices', {}, qs);
                    }
                    if (operation === 'update') {
                        const specificPriceId = this.getNodeParameter('specificPriceId', i);
                        const productId = this.getNodeParameter('productId', i);
                        const combinationId = this.getNodeParameter('combinationId', i, 0);
                        const currencyId = this.getNodeParameter('currencyId', i, 0);
                        const countryId = this.getNodeParameter('countryId', i, 0);
                        const groupId = this.getNodeParameter('groupId', i, 0);
                        const customerId = this.getNodeParameter('customerId', i, 0);
                        const fromQuantity = this.getNodeParameter('fromQuantity', i, 1);
                        const unlimitedDuration = this.getNodeParameter('unlimitedDuration', i, true);
                        const dateFrom = this.getNodeParameter('dateFrom', i, '');
                        const dateTo = this.getNodeParameter('dateTo', i, '');
                        const impactMode = this.getNodeParameter('impactMode', i);
                        const isMultishop = this.getNodeParameter('isMultishop', i, false);
                        const specificPriceData = {};
                        specificPriceData.id = specificPriceId;
                        if (productId)
                            specificPriceData.id_product = productId;
                        if (combinationId)
                            specificPriceData.id_product_attribute = combinationId;
                        if (fromQuantity)
                            specificPriceData.from_quantity = fromQuantity;
                        if (currencyId)
                            specificPriceData.id_currency = currencyId;
                        if (countryId)
                            specificPriceData.id_country = countryId;
                        if (groupId)
                            specificPriceData.id_group = groupId;
                        if (customerId)
                            specificPriceData.id_customer = customerId;
                        if (impactMode === 'discount') {
                            const reduction = this.getNodeParameter('reductionValue', i, 0);
                            const reductionTax = this.getNodeParameter('reductionIncludeTax', i, true);
                            const reductionType = this.getNodeParameter('reductionType', i, 'amount');
                            if (reduction !== undefined)
                                specificPriceData.reduction = (reductionType === 'percentage' ? reduction / 100 : reduction);
                            if (reductionTax !== undefined)
                                specificPriceData.reduction_tax = reductionTax ? '1' : '0';
                            if (reductionType)
                                specificPriceData.reduction_type = reductionType;
                        }
                        else if (impactMode === 'fixedPrice') {
                            const fixedPrice = this.getNodeParameter('fixedPriceTaxExcluded', i);
                            if (fixedPrice !== undefined)
                                specificPriceData.price = fixedPrice;
                        }
                        if (unlimitedDuration) {
                            specificPriceData.from = '0000-00-00 00:00:00';
                            specificPriceData.to = '0000-00-00 00:00:00';
                        }
                        else {
                            if (dateFrom)
                                specificPriceData.from = dateFrom.replace('T', ' ');
                            if (dateTo)
                                specificPriceData.to = dateTo.replace('T', ' ');
                        }
                        if (isMultishop) {
                            const shopId = this.getNodeParameter('shopId', i, 0);
                            const shopGroupId = this.getNodeParameter('shopGroupId', i, 0);
                            if (shopId)
                                specificPriceData.id_shop = shopId;
                            if (shopGroupId)
                                specificPriceData.id_shop_group = shopGroupId;
                        }
                        for (const key of Object.keys(specificPriceData)) {
                            if (typeof specificPriceData[key] === 'boolean') {
                                specificPriceData[key] = specificPriceData[key] ? '1' : '0';
                            }
                            else if (typeof specificPriceData[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(specificPriceData[key])) {
                                specificPriceData[key] = specificPriceData[key].replace('T', ' ');
                            }
                        }
                        const builder = new fast_xml_parser_1.XMLBuilder({ ignoreAttributes: false });
                        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                            builder.build({ prestashop: { specific_price: specificPriceData } });
                        responseData = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'PATCH', `specific_prices/${specificPriceId}`, body);
                    }
                }
                const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), { itemData: { item: i } });
                returnData.push(...executionData);
            }
            catch (error) {
                if (this.continueOnFail()) {
                    const executionErrorData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray({ error: error.message }), { itemData: { item: i } });
                    returnData.push(...executionErrorData);
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.QloAppsHotel = QloAppsHotel;
//# sourceMappingURL=QloAppsHotel.node.js.map