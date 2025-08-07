"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QloAppsHotelTrigger = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class QloAppsHotelTrigger {
    constructor() {
        this.description = {
            displayName: "QloApps Hotel Trigger",
            name: "qloappsHotelTrigger",
            icon: "file:qloapps-hotel.svg",
            group: ['trigger'],
            version: 1,
            description: "Handle QloApps Hotel events via API",
            subtitle: '={{$parameter["event"]}}',
            defaults: {
                name: "QloApps Hotel Trigger",
            },
            inputs: [],
            outputs: ["main"],
            polling: true,
            credentials: [
                {
                    name: "qloappsHotelApi",
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Trigger On',
                    name: 'event',
                    type: 'options',
                    noDataExpression: true,
                    default: 'customers.created',
                    options: [
                        {
                            name: 'Address Created',
                            value: 'addresses.created',
                        },
                        {
                            name: 'Carrier Created',
                            value: 'carriers.created',
                        },
                        {
                            name: 'Cart Created',
                            value: 'carts.created',
                        },
                        {
                            name: 'Cart Rule Created',
                            value: 'cart_rules.created',
                        },
                        {
                            name: 'Category Created',
                            value: 'categories.created',
                        },
                        {
                            name: 'Combination Created',
                            value: 'combinations.created',
                        },
                        {
                            name: 'Customer Created',
                            value: 'customers.created',
                        },
                        {
                            name: 'Customer Message Created',
                            value: 'customer_messages.created',
                        },
                        {
                            name: 'Customer Thread Created',
                            value: 'customer_threads.created',
                        },
                        {
                            name: 'Employee Created',
                            value: 'employees.created',
                        },
                        {
                            name: 'Manufacturer Created',
                            value: 'manufacturers.created',
                        },
                        {
                            name: 'Message Created',
                            value: 'messages.created',
                        },
                        {
                            name: 'Order Carrier Created',
                            value: 'order_carriers.created',
                        },
                        {
                            name: 'Order Created',
                            value: 'orders.created',
                        },
                        {
                            name: 'Order Detail Created',
                            value: 'order_details.created',
                        },
                        {
                            name: 'Order History Created',
                            value: 'order_histories.created',
                        },
                        {
                            name: 'Order Payment Created',
                            value: 'order_payments.created',
                        },
                        {
                            name: 'Product Created',
                            value: 'products.created',
                        },
                        {
                            name: 'Specific Price Created',
                            value: 'specific_prices.created',
                        },
                        {
                            name: 'Specific Price Rule Created',
                            value: 'specific_price_rules.created',
                        },
                        {
                            name: 'Stock Available Created',
                            value: 'stock_availables.created',
                        },
                        {
                            name: 'Store Created',
                            value: 'stores.created',
                        },
                        {
                            name: 'Supplier Created',
                            value: 'suppliers.created',
                        },
                        {
                            name: 'Tag Created',
                            value: 'tags.created',
                        },
                    ]
                },
                {
                    displayName: 'Starting ID',
                    name: 'startingId',
                    type: 'number',
                    default: 0,
                    description: 'Only entities with ID greater that this value will be detected',
                },
            ],
        };
    }
    async poll() {
        const nodeData = this.getWorkflowStaticData('node');
        const lastId = nodeData.lastCheckedId || this.getNodeParameter('startingId', 0);
        const event = this.getNodeParameter('event');
        const [entity, action] = event.split('.');
        let queryString = '';
        if (action === 'created') {
            queryString = (0, GenericFunctions_1.getFilterQuery)({
                conditions: [
                    {
                        field: 'id',
                        condition_type: 'gt',
                        value: lastId.toString(),
                    }
                ],
                sort: [{ direction: 'ASC', field: 'id' }],
            });
        }
        const response = await GenericFunctions_1.qloappsHotelApiRequest.call(this, 'GET', entity, {}, queryString);
        const newItems = response[entity] || [];
        if (newItems.length === 0) {
            return [];
        }
        const maxId = Math.max(...newItems.map((item) => parseInt(item.id)));
        nodeData.lastCheckedId = maxId;
        return [newItems.map((item) => ({ json: item }))];
    }
}
exports.QloAppsHotelTrigger = QloAppsHotelTrigger;
//# sourceMappingURL=QloAppsHotelTrigger.node.js.map