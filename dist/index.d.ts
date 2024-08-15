import { Auth } from "googleapis";
export interface ApiParam {
    spreadsheetId: string;
    sheetRange: string;
    photoFolder: string;
}
export interface Category {
    key: string;
    title: string;
    photo: string;
}
export interface SubCategory {
    title: string;
    photo: string;
}
export interface MasterData {
    category: Category[];
    country: SubCategory[];
    role: SubCategory[];
    birthplace: SubCategory[];
    yearofbirth: SubCategory[];
    monthofbirth: SubCategory[];
    project: SubCategory[];
    club: SubCategory[];
    gender: SubCategory[];
    joiningyear: SubCategory[];
    office: SubCategory[];
}
export interface Employee {
    id: string;
    name: string;
    email: string;
    gender: string;
    dob: string;
    date_joined: string;
    role: string;
    phone: string;
    country: string;
    birthplace: string;
    address: string;
    projects: string[];
    club: string[];
    bio: string;
    photo: string;
    yearofbirth: string;
    monthofbirth: string;
    joiningyear: string;
    short_name: string;
}
export declare function getGoogleAuthCredentials(): Auth.GoogleAuth;
export declare function getPhotoCdn(photos: Map<string, string>, key: string): string;
export declare function listFilesInFolder(auth: Auth.GoogleAuth, folderId: string): Promise<Map<string, string>>;
export declare function employeeAPI(req: any, res: any, param: ApiParam): Promise<Employee[] | undefined>;
export declare function getAllEmployees(param: ApiParam): Promise<Employee[]>;
export declare function masterDataAPI(req: any, res: any, param: ApiParam): Promise<void>;
export declare function getMasterDataSource(param: ApiParam): Promise<MasterData>;
export declare function filterCategory(categoryKey: string, apiMasterData: MasterData): SubCategory[];
export declare function filterEmployee(categoryKey: string, filterValue: string, apiEmployees: Employee[]): Employee[];
export declare const fetchApis: (apiKey: string) => Promise<[Employee[], MasterData] | null>;
