"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleAuthCredentials = getGoogleAuthCredentials;
exports.getPhotoCdn = getPhotoCdn;
exports.listFilesInFolder = listFilesInFolder;
exports.employeeAPI = employeeAPI;
exports.getAllEmployees = getAllEmployees;
exports.masterDataAPI = masterDataAPI;
exports.getMasterDataSource = getMasterDataSource;
const googleapis_1 = require("googleapis");
function getGoogleAuthCredentials() {
    return new googleapis_1.Auth.GoogleAuth({
        projectId: process.env.GOOGLE_PROJECT_ID,
        credentials: {
            private_key_id: process.env.GOOGLE_CREDENTIAL_PRIVATE_KEY_ID,
            private_key: process.env.GOOGLE_CREDENTIAL_PRIVATE_KEY,
            client_email: process.env.GOOGLE_CREDENTIAL_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CREDENTIAL_CLIENT_ID,
        },
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.readonly',
        ],
    });
}
function getPhotoCdn(photos, key) {
    const photoId = photos.get(key);
    return photoId ? `${process.env.DRIVE_PHOTO_HOST}/${photoId}` : '';
}
async function listFilesInFolder(auth, folderId) {
    var _a;
    const drive = googleapis_1.google.drive({ version: 'v3', auth });
    const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id, name)',
    });
    const fileMap = new Map();
    (_a = res.data.files) === null || _a === void 0 ? void 0 : _a.forEach(file => {
        if (file.name && file.id) {
            fileMap.set(file.name, file.id);
        }
    });
    if (!fileMap.size) {
        console.log('No files found.');
    }
    return fileMap;
}
function validateSecretKey(req, res) {
    var _a;
    const secretApi = (_a = req.headers['x-secret-key']) !== null && _a !== void 0 ? _a : req.query['x-secret-key'];
    if (secretApi !== process.env.API_SECRET_KEY) {
        res.status(401).json({
            error_code: 'unauthorized',
            error_message: 'Invalid secret key',
        });
        return false;
    }
    return true;
}
async function employeeAPI(req, res, param) {
    if (!validateSecretKey(req, res))
        return;
    try {
        const employees = await getAllEmployees(param);
        res.status(200).json(employees);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error_code: '00001',
            error_message: 'Internal Server Error',
        });
    }
}
async function getAllEmployees(param) {
    const auth = getGoogleAuthCredentials();
    const photos = await listFilesInFolder(auth, param.photoFolder);
    const sheets = googleapis_1.google.sheets({ version: 'v4', auth });
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: param.spreadsheetId,
            range: param.sheetRange,
        });
        const rows = response.data.values;
        if (!rows || !rows.length) {
            console.log('No employee data found.');
            return [];
        }
        const [headers, ...dataRows] = rows;
        return dataRows.map(row => headers.reduce((employee, header, index) => {
            var _a, _b, _c;
            switch (header) {
                case 'photo':
                    employee[header] = getPhotoCdn(photos, row[index]);
                    break;
                case 'projects':
                case 'club':
                    employee[header] = (_c = (_b = (_a = row[index]) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.map((it) => it.trim())) !== null && _c !== void 0 ? _c : [];
                    break;
                case 'dob':
                    const dobValue = row[index] || '';
                    const [month, , year] = dobValue.split('/');
                    employee['monthofbirth'] = month;
                    employee['yearofbirth'] = year;
                    employee[header] = dobValue;
                    break;
                case 'date_joined':
                    const dateJoined = row[index] || '';
                    const [, , yearJoined] = dateJoined.split('/');
                    employee['joiningyear'] = yearJoined;
                    employee[header] = dateJoined;
                    break;
                default:
                    employee[header] = row[index] || '';
                    break;
            }
            return employee;
        }, {}));
    }
    catch (err) {
        console.error('Error retrieving employee data:', err);
        throw err;
    }
}
async function masterDataAPI(req, res, param) {
    if (!validateSecretKey(req, res))
        return;
    try {
        const masterData = await getMasterDataSource(param);
        res.status(200).json(masterData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error_code: '00002',
            error_message: 'Internal Server Error',
        });
    }
}
async function getMasterDataSource(param) {
    const auth = getGoogleAuthCredentials();
    const photos = await listFilesInFolder(auth, param.photoFolder);
    const sheets = googleapis_1.google.sheets({ version: 'v4', auth });
    try {
        const result = {
            category: [],
            country: [],
            role: [],
            birthplace: [],
            yearofbirth: [],
            monthofbirth: [],
            projects: [],
            club: [],
            gender: [],
            joiningyear: [],
            office: []
        };
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: param.spreadsheetId,
            range: param.sheetRange,
        });
        const rows = response.data.values;
        if (!rows || rows.length <= 1) {
            console.log('No data found.');
            return result;
        }
        rows.slice(2).forEach(row => {
            if (row[0])
                result.category.push({ key: row[0], title: row[1], photo: getPhotoCdn(photos, row[2]) });
            if (row[4])
                result.country.push({ title: row[4], photo: getPhotoCdn(photos, row[5]) });
            if (row[7])
                result.role.push({ title: row[7], photo: getPhotoCdn(photos, row[8]) });
            if (row[10])
                result.birthplace.push({ title: row[10], photo: getPhotoCdn(photos, row[11]) });
            if (row[13])
                result.yearofbirth.push({ title: row[13], photo: getPhotoCdn(photos, row[14]) });
            if (row[16])
                result.monthofbirth.push({ title: row[16], photo: getPhotoCdn(photos, row[17]) });
            if (row[19])
                result.projects.push({ title: row[19], photo: getPhotoCdn(photos, row[20]) });
            if (row[22])
                result.club.push({ title: row[22], photo: getPhotoCdn(photos, row[23]) });
            if (row[25])
                result.gender.push({ title: row[25], photo: getPhotoCdn(photos, row[26]) });
            if (row[28])
                result.joiningyear.push({ title: row[28], photo: getPhotoCdn(photos, row[29]) });
            if (row[31])
                result.office.push({ title: row[31], photo: getPhotoCdn(photos, row[32]) });
        });
        return result;
    }
    catch (err) {
        console.error('Error retrieving data source:', err);
        throw err;
    }
}
