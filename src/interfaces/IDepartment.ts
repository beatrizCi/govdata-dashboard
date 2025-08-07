export interface Subordinate {
  name: string;
}

export interface Department {
  name: string;
  subordinates?: Subordinate[];
}

export interface DepartmentList {
  departments: Department[];
}
