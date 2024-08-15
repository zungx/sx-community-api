
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
  projects: SubCategory[];
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
  dob: string; // Date of birth in the format "MM/DD/YYYY"
  date_joined: string; // Date joined in the format "MM/DD/YYYY"
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