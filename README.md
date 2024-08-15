# sx-community-api

## Setup API
1. Setup env
```
SPREADSHEET_ID=
EMPLOYEE_SHEET_RANGE=
MASTER_DATA_SHEET_RANGE=
EMPLOYEE_PHOTO_FOLDER=
CATEGORY_PHOTO_FOLDER=
NEXT_PUBLIC_API_SECRET_KEY=
DRIVE_PHOTO_HOST=
GOOGLE_PROJECT_ID=
GOOGLE_CREDENTIAL_PRIVATE_KEY_ID=
GOOGLE_CREDENTIAL_PRIVATE_KEY=""
GOOGLE_CREDENTIAL_CLIENT_EMAIL=
GOOGLE_CREDENTIAL_CLIENT_ID=

```

2. Create new file employee.ts inside folder `app/api/employee/route.ts` and update the code like this
```
import { type NextRequest, NextResponse } from 'next/server'
import { getAllEmployees } from 'sx-community-data';
 
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const secretKey = request.headers.get('x-secret-key') ?? searchParams.get('x-secret-key');
    if (secretKey !== process.env.NEXT_PUBLIC_API_SECRET_KEY) {
      return NextResponse.json({
        error_code: 'unauthorized',
        error_message: 'Invalid secret key',
      }, {
        status: 401
      });
    }
    const employees = await getAllEmployees({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      sheetRange: process.env.EMPLOYEE_SHEET_RANGE!,
      photoFolder: process.env.EMPLOYEE_PHOTO_FOLDER!,
    });
   
    return NextResponse.json(employees, {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error_code: '00001',
      error_message: 'Internal Server Error',
    }, {
      status: 500
    });
  }
}
```

3. Create new file master-data.ts inside folder `pages/api/master-data/route.ts` and update the code like this
```
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const secretKey = request.headers.get('x-secret-key') ?? searchParams.get('x-secret-key');
    if (secretKey !== process.env.NEXT_PUBLIC_API_SECRET_KEY) {
      return NextResponse.json({
        error_code: 'unauthorized',
        error_message: 'Invalid secret key',
      }, {
        status: 401
      });
    }
    const result = await getMasterDataSource({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      sheetRange: process.env.MASTER_DATA_SHEET_RANGE!,
      photoFolder: process.env.MASTER_SOURCE_PHOTO_FOLDER!,
    });
   
    return NextResponse.json(result, {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error_code: '00002',
      error_message: 'Internal Server Error',
    }, {
      status: 500
    });
  }
}
```


## Use API 

TODO: fetch/parse response/ handle error

## Common function

### Filter employee by sub category
```
const employees = filterEmployee(categoryKey, value, apiResponse);
```


## Model

```
ApiParam
Employee
MasterData
Category
SubCategory
```
