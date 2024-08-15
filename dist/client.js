"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchApis = void 0;
exports.filterCategory = filterCategory;
exports.filterEmployee = filterEmployee;
function filterCategory(categoryKey, apiMasterData) {
    const key = categoryKey;
    return apiMasterData[key];
}
function filterEmployee(categoryKey, filterValue, apiEmployees) {
    const key = categoryKey;
    switch (key) {
        case 'club':
        case 'projects':
            return apiEmployees.filter((it) => { var _a; return (_a = it[key]) === null || _a === void 0 ? void 0 : _a.includes(filterValue); });
        default:
            return apiEmployees.filter((it) => it[key] === filterValue);
    }
}
const fetchApis = async (apiKey) => {
    try {
        const [employeesResponse, masterDataResponse] = await Promise.all([
            fetch('/api/employee', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-secret-key': apiKey
                }
            }),
            fetch('/api/master-data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-secret-key': apiKey
                }
            }),
        ]);
        const employees = await handleResponse(employeesResponse);
        const masterData = await handleResponse(masterDataResponse);
        return [employees, masterData];
    }
    catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};
exports.fetchApis = fetchApis;
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
            throw new Error(`Unauthorized: ${errorData.error_message}`);
        }
        else if (response.status === 500) {
            throw new Error(`Internal Server Error: ${errorData.error_message}`);
        }
        else {
            throw new Error(`Error: ${errorData.error_message}`);
        }
    }
    const data = await response.json();
    return data;
};
