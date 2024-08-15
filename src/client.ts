import { MasterData, SubCategory, Employee } from "./model";

export function filterCategory(categoryKey: string, apiMasterData: MasterData): SubCategory[] {
  const key = categoryKey as  keyof MasterData;
  return apiMasterData[key];
}

export function filterEmployee(categoryKey: string, filterValue: string, apiEmployees: Employee[]): Employee[] {
  const key = categoryKey as  keyof Employee;
  switch(key) {
    case 'club':
    case 'projects':
      return apiEmployees.filter((it) => it[key]?.includes(filterValue));
    default:
      return apiEmployees.filter((it) => it[key] === filterValue);
  } 
}

export interface ApiErrorResponse {
  error_code: string;
  error_message: string;
}

export const fetchApis = async (apiKey: string): Promise<[Employee[], MasterData] | null> => {
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
    const employees = await handleResponse<Employee[]>(employeesResponse);
    const masterData = await handleResponse<MasterData>(masterDataResponse);

    return [employees, masterData];
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (response.status === 401) {
      throw new Error(`Unauthorized: ${errorData.error_message}`);
    } else if (response.status === 500) {
      throw new Error(`Internal Server Error: ${errorData.error_message}`);
    } else {
      throw new Error(`Error: ${errorData.error_message}`);
    }
  }
  const data: T = await response.json();
  return data;
};
