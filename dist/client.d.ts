import { MasterData, SubCategory, Employee } from "./model";
export declare function filterCategory(categoryKey: string, apiMasterData: MasterData): SubCategory[];
export declare function filterEmployee(categoryKey: string, filterValue: string, apiEmployees: Employee[]): Employee[];
export interface ApiErrorResponse {
    error_code: string;
    error_message: string;
}
export declare const fetchApis: (apiKey: string) => Promise<[Employee[], MasterData] | null>;
