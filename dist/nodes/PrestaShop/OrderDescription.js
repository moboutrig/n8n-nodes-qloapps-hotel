"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderFields = exports.orderOperations = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
exports.orderOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['order'],
            },
        },
        options: [
            {
                name: 'Change Status',
                value: 'changeStatus',
                description: 'Change an order status',
                action: 'Change an order status',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete an order',
                action: 'Delete an order',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get an order',
                action: 'Get an order',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many orders',
                action: 'Get many orders',
            },
            {
                name: 'Set Internal Note',
                value: 'orderNote',
                description: 'Change an order internal note',
                action: 'Change an order internal note',
            },
            {
                name: 'Set Shipping Number',
                value: 'shippingNumber',
                description: 'Change an order shipping number',
                action: 'Change an order shipping number',
            },
        ],
        default: 'get',
    },
];
exports.orderFields = [
    {
        displayName: 'Order ID',
        name: 'orderId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['order'],
                operation: ['delete', 'get', 'changeStatus', 'shippingNumber', 'orderNote'],
            },
        },
    },
    {
        displayName: 'Order State Name or ID',
        name: 'orderStateId',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getOrderStates'
        },
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['order'],
                operation: ['changeStatus'],
            },
        },
    },
    {
        displayName: 'Shipping Number',
        name: 'orderShippingNumber',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['order'],
                operation: ['shippingNumber'],
            },
        },
    },
    {
        displayName: 'Internal Note',
        name: 'orderNoteMessage',
        type: 'string',
        required: true,
        default: '',
        typeOptions: {
            rows: 5,
        },
        displayOptions: {
            show: {
                resource: ['order'],
                operation: ['orderNote'],
            },
        },
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
            minValue: 1,
        },
        displayOptions: {
            show: {
                resource: ['order'],
                operation: ['getAll'],
            },
        },
        default: 50,
        description: 'Max number of results to return',
    },
    ...(0, GenericFunctions_1.getSearchFilters)('order', 'getOrderAttributes', 'getOrderAttributes'),
];
//# sourceMappingURL=OrderDescription.js.map