import * as fs from 'fs';
import * as path from 'path';

// Actual test data is in testdata.json. Edit that file to add or change data sets.
// This file only defines the types and loads the JSON, so pages and specs stay unchanged.

export interface TextBoxData {
  title: string;
  tags: string[];
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export interface PracticeFormData {
  title: string;
  tags: string[];
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  subject: string;
  hobby: string;
  address: string;
  state: string;
  city: string;
}

export interface CheckBoxData {
  title: string;
  tags: string[];
  node: string;
  expected: string[];
}

export interface RadioData {
  title: string;
  tags: string[];
  option: string;
}

export interface WebTableData {
  title: string;
  tags: string[];
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export interface AlertData {
  title: string;
  tags: string[];
  accept: boolean;
  expected: string;
}

export interface TabData {
  title: string;
  tags: string[];
  tab: string;
  expected: string;
}

interface AllTestData {
  textBox: TextBoxData[];
  practiceForm: PracticeFormData[];
  checkBox: CheckBoxData[];
  radio: RadioData[];
  webTable: WebTableData[];
  alert: AlertData[];
  tab: TabData[];
}

const raw: AllTestData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'testdata.json'), 'utf-8'),
);

export const textBoxData = raw.textBox;
export const practiceFormData = raw.practiceForm;
export const checkBoxData = raw.checkBox;
export const radioData = raw.radio;
export const webTableData = raw.webTable;
export const alertData = raw.alert;
export const tabData = raw.tab;





                                           











