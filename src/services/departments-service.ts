import { DepartmentList } from "../interfaces/IDepartment";

export function getMinistriesNames(departmentList: DepartmentList): string[] {
  return departmentList.departments.map((department) => department.name.trim());
}

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
