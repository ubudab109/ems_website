export const URL_SERVICE = process.env.REACT_APP_BACKEND_URL;
export const INVITE_STATUS = [
  {
    value: '0',
    label: 'Pending',
  },
  {
    value: '1',
    label: 'Accepted',
  },
];

export const JOB_STATUS = [
  {
    name: 'job_status',
    id: 0,
    value: 'all',
    label: 'All Status (Default)',
  },
  {
    name: 'job_status',
    id: 1,
    value: '0',
    label: 'Permanent',
  },
  {
    name: 'job_status',
    id: 2,
    value: '1',
    label: 'Contract',
  },
  {
    name: 'job_status',
    id: 3,
    value: '2',
    label: 'Probation',
  },
];

export const JOB_STATUS_NOT_FILTER = [
  {
    name: 'job_status',
    id: 1,
    value: '0',
    label: 'Permanent',
  },
  {
    name: 'job_status',
    id: 2,
    value: '1',
    label: 'Contract',
  },
  {
    name: 'job_status',
    id: 3,
    value: '2',
    label: 'Probation',
  },
];

export const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const YEARS = [
  2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032,
  2034, 2035, 2036, 2037, 2038, 2039, 2040,
];

export const MONTH_LIST = [
  {
    value: 1,
    label: 'Januari',
    label_en: 'January',
  },
  {
    value: 2,
    label: 'Februari',
    label_en: 'February',
  },
  {
    value: 3,
    label: 'Maret',
    label_en: 'March',
  },
  {
    value: 4,
    label: 'April',
    label_en: 'April',
  },
  {
    value: 4,
    label: 'Mei',
    label_en: 'May',
  },
  {
    value: 6,
    label: 'Juni',
    label_en: 'June',
  },
  {
    value: 7,
    label: 'July',
    label_en: 'July',
  },
  {
    value: 8,
    label: 'Agustus',
    label_en: 'August',
  },
  {
    value: 9,
    label: 'September',
    label_en: 'September',
  },
  {
    value: 10,
    label: 'Oktober',
    label_en: 'October',
  },
  {
    value: 11,
    label: 'November',
    label_en: 'November',
  },
  {
    value: 12,
    label: 'Desember',
    label_en: 'December',
  },
];

export const WORK_PLACES_OPTION = [
  {
    name: 'work_places',
    value: '',
    label: 'Select Work Places'
  },
  {
    name: 'work_places',
    value: '0',
    label: 'On Office',
  },
  {
    name: 'work_places',
    value: '1',
    label: 'Remote',
  },
];

export const TIME_STATUS_OPTION = [
  {
    name: 'status_clock',
    value: '',
    label: 'Select Time Status',
  },
  {
    name: 'status_clock',
    value: '0',
    label: 'On Time',
  },
  {
    name: 'status_clock',
    value: '1',
    label: 'Late',
  },
  {
    name: 'status_clock',
    value: '2',
    label: 'Absent',
  },
];

export const EMPLOYEE_STATUS = [
  {
    value: '',
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
    label: 'Single',
  },
  {
    name: 'marital_status',
    value: 'married',
    label: 'Married',
  },
  {
    name: 'marital_status',
    value: 'divorce',
    label: 'Divorce',
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
  },
];

export const STATUS_EMPLOYEE = [
  {
    name: 'status',
    value: '0',
    label: 'Inactive',
  },
  {
    name: 'status',
    value: '1',
    label: 'Active',
  },
];

// 0 pending, 1 approve, 2 rejected
export const OVERTIME_STATUS = [
  {
    name: 'status',
    value: '',
    label: 'Select Overtime Status...'
  },
  {
    name: 'status',
    value: '0',
    label: 'Pending',
  },
  {
    name: 'status',
    value: '1',
    label: 'Has Been Applied',
  },
  {
    name: 'status',
    value: '2',
    label: 'Rejected',
  }
];