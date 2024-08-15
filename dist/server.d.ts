import { Auth } from "googleapis";
import { ApiParam, Employee, MasterData } from "./model";
export declare function getGoogleAuthCredentials(): Auth.GoogleAuth;
export declare function getPhotoCdn(photos: Map<string, string>, key: string): string;
export declare function listFilesInFolder(auth: Auth.GoogleAuth, folderId: string): Promise<Map<string, string>>;
export declare function employeeAPI(req: any, res: any, param: ApiParam): Promise<Employee[] | undefined>;
export declare function getAllEmployees(param: ApiParam): Promise<Employee[]>;
export declare function masterDataAPI(req: any, res: any, param: ApiParam): Promise<void>;
export declare function getMasterDataSource(param: ApiParam): Promise<MasterData>;
