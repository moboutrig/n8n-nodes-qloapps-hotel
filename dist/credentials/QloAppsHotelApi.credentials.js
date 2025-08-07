"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QloAppsHotelApi = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class QloAppsHotelApi {
    constructor() {
        this.name = 'qloappsHotelApi';
        this.displayName = 'QloApps Hotel API';
        this.documentationUrl = 'https://devdocs.qloapps.com/webservice/';
        this.properties = [
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                required: true,
                type: 'string',
                default: '',
                description: 'Base url of your shop (example: https://www.mishop.com)',
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                required: true,
                type: 'string',
                typeOptions: { password: true },
                default: '',
            },
        ];
    }
    async authenticate(credentials, requestOptions) {
        requestOptions.headers = {
            ...requestOptions.headers,
            Authorization: `Basic ${Buffer.from(`${credentials.apiKey}:`).toString(n8n_workflow_1.BINARY_ENCODING)}`,
        };
        return requestOptions;
    }
}
exports.QloAppsHotelApi = QloAppsHotelApi;
//# sourceMappingURL=QloAppsHotelApi.credentials.js.map