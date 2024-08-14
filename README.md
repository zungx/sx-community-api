# sx-community-api

## Setup API
1. Setup env
```
SPREADSHEET_ID=
EMPLOYEE_SHEET_RANGE=
MASTER_DATA_SHEET_RANGE=
EMPLOYEE_PHOTO_FOLDER=
CATEGORY_PHOTO_FOLDER=
API_SECRET_KEY=
DRIVE_PHOTO_HOST=
GOOGLE_PROJECT_ID=
GOOGLE_CREDENTIAL_PRIVATE_KEY_ID=
GOOGLE_CREDENTIAL_PRIVATE_KEY=""
GOOGLE_CREDENTIAL_CLIENT_EMAIL=
GOOGLE_CREDENTIAL_CLIENT_ID=

```

2. Create new file employee.ts inside folder `pages/api/employee.ts` and update the code like this
```
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return employeeAPI(req, res, {
    spreadsheetId: process.env.SPREADSHEET_ID,
    sheetRange: process.env.EMPLOYEE_SHEET_RANGE,
    photoFolder: process.env.EMPLOYEE_PHOTO_FOLDER,
  });
}
```

3. Create new file master-data.ts inside folder `pages/api/master-data.ts` and update the code like this
```
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return masterDataAPI(req, res, {
    spreadsheetId: process.env.SPREADSHEET_ID!,
    sheetRange: process.env.MASTER_DATA_SHEET_RANGE!,
    photoFolder: process.env.MASTER_SOURCE_PHOTO_FOLDER!
  });
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
