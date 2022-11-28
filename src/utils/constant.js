export const URL_SERVICE = process.env.REACT_APP_BACKEND_URL;
export const INVITE_STATUS = [
  {
    value : '0',
    label : 'Pending',
  },
  {
    value : '1',
    label : 'Accepted'
  },
];

export const JOB_STATUS = [
  {
    id: 0,
    value: 'all',
    label: 'All Status (Default)'
  },
  {
    id: 1,
    value: '0',
    label: 'Permanent'
  },
  {
    id: 2,
    value: '1',
    label: 'Contract',
  },
  {
    id: 3,
    value: '2',
    label: 'Probation',
  },
];

export const MONTH = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2034, 2035, 2036, 2037, 2038, 2039, 2040];

export const MONTH_LIST = [
  {
    value     : 'January',
    label     : 'Januari',
    label_en  : 'January',
  },
  {
    value     : 'February',
    label     : 'Februari',
    label_en  : 'February',
  },
  {
    value     : 'March',
    label     : 'Maret',
    label_en  : 'March',
  },
  {
    value     : 'April',
    label     : 'April',
    label_en  : 'April',
  },
  {
    value     : 'May',
    label     : 'Mei',
    label_en  : 'May',
  },
  {
    value     : 'June',
    label     : 'Juni',
    label_en  : 'June',
  },
  {
    value     : 'July',
    label     : 'July',
    label_en  : 'July',
  },
  {
    value     : 'August',
    label     : 'Agustus',
    label_en  : 'August',
  },
  {
    value     : 'September',
    label     : 'September',
    label_en  : 'September',
  },
  {
    value     : 'October',
    label     : 'Oktober',
    label_en  : 'October',
  },
  {
    value     : 'November',
    label     : 'November',
    label_en  : 'November',
  },
  {
    value     : 'December',
    label     : 'Desember',
    label_en  : 'December',
  },
];

export const WORK_PLACES_OPTION = [
 {
   value: '0',
   label: 'On Office',
 },
 {
   value: '1',
   label: 'Remote'
 }
];

export const TIME_STATUS_OPTION = [
  {
    value: '0',
    label: 'On Time',
  },
  {
    value: '1',
    label: 'Late'
  },
  {
    value: '2',
    label: 'Absent'
  },
 ];

export const EMPLOYEE_STATUS = [
  {
    value : '',
    label: 'All',
  },
  {
    value: '0',
    label: 'Inactive',
  },
  {
    value: '1',
    label: 'Active',
  },
  {
    value: '2',
    label: 'Pending',
  },
];

export const MARITAL_STATUS = [
  {
    name: 'marital_status',
    value: 'single',
    label: 'Single'
  },
  {
    name: 'marital_status',
    value: 'married',
    label: 'Married',
  },
  {
    name: 'marital_status',
    value: 'divorce',
    label: 'Divorce'
  },
];


export const BLOOD_TYPE = [
  {
    name: 'blood_type',
    value: 'A',
    label: 'A',
  },
  {
    name: 'blood_type',
    value: 'AB',
    label: 'AB',
  },
  {
    name: 'blood_type',
    value: 'B',
    label: 'B',
  },
  {
    name: 'blood_type',
    value: 'O',
    label: 'O',
  },
];

export const RELIGION = [
  {
    name: 'religion',
    value: 'Islam',
    label: 'Islam',
  },
  {
    name: 'religion',
    value: 'Protestant',
    label: 'Protestant',
  },
  {
    name: 'religion',
    value: 'Catholic',
    label: 'Catholic',
  },
  {
    name: 'religion',
    value: 'Hindu',
    label: 'Hindu',
  },
  {
    name: 'religion',
    value: 'Buddha',
    label: 'Buddha',
  },
  {
    name: 'religion',
    value: 'Konhucu',
    label: 'Konhucu',
  },
  {
    name: 'religion',
    value: 'Other',
    label: 'Other',
  },
];

export const IDENTITY_TYPE = [
  {
    name: 'identity_type',
    value: '0',
    label: 'National ID Card (KTP)',
  },
  {
    name: 'identity_type',
    value: '1',
    label: 'Passport',
  },
  {
    name: 'identity_type',
    value: '2',
    label: 'Driver License (SIM)',
  }
];
