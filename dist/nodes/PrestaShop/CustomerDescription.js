"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerFields = exports.customerOperations = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
exports.customerOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['customer'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new customer',
                action: 'Create a customer',
            },
            {
                name: 'Delete',
                value: 'delete',
                description: 'Delete a customer',
                action: 'Delete a customer',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get a customer',
                action: 'Get a customer',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many customers',
                action: 'Get many customers',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a customer',
                action: 'Update a customer',
            },
        ],
        default: 'create',
    },
];
exports.customerFields = [
    {
        displayName: 'Customer ID',
        name: 'customerId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['delete', 'update', 'get'],
            },
        },
    },
    {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'First Name',
        name: 'firstname',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Last Name',
        name: 'lastname',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Password',
        name: 'passwd',
        type: 'string',
        required: true,
        default: '',
        typeOptions: { password: true },
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['update'],
            },
        },
    },
    {
        displayName: 'First Name',
        name: 'firstname',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['update'],
            },
        },
    },
    {
        displayName: 'Last Name',
        name: 'lastname',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['update'],
            },
        },
    },
    {
        displayName: 'Password',
        name: 'passwd',
        type: 'string',
        default: '',
        typeOptions: { password: true },
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['update'],
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['create', 'update'],
            },
        },
        options: [...(0, GenericFunctions_1.getCustomerOptionalFields)()],
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['customer'],
                operation: ['getAll'],
            },
        },
        typeOptions: {
            minValue: 1,
        },
        default: 50,
        description: 'Max number of results to return',
    },
    ...(0, GenericFunctions_1.getSearchFilters)('customer', 'getCustomerAttributes', 'getCustomerAttributes'),
];
//# sourceMappingURL=CustomerDescription.js.map