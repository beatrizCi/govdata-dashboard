import { DepartmentList } from "../interfaces/IDepartment";

type Subordinate = {
  name: string;
};


// Trim names to avoid trailing space mismatches

export function getMinistriesNames(departmentList: DepartmentList): string[] {
  return departmentList.departments.map((department) => department.name.trim());
}

// Use strict equality (===) and trim comparisons

export function getSubordinates(
  departmentList: DepartmentList,
  ministryName: string
): string[] {
  const ministry = departmentList.departments.find(
    (department) => department.name.trim() === ministryName.trim()
  );
  return ministry?.subordinates?.map((sub) => sub.name.trim()) || [];
}
export { DepartmentList };

