import { DepartmentDatasetCount } from "../interfaces/IOrganization";
import {
  DepartmentList,
  getMinistriesNames as getDepartmentNames,
  getSubordinates,
} from "./departments-service";

export type OrganizationData = {
  title: string;
  package_count: number;
};



// ✅ Improvement: Pre-index organizationsData using Map for O(1) lookups

export function getDatasetCounts(
  departmentList: DepartmentList,
  organizationsData: OrganizationData[]
): DepartmentDatasetCount[] {
  const departments = getDepartmentNames(departmentList);
  const orgMap = new Map(
    organizationsData.map((org) => [org.title.trim(), org.package_count])
  );

  return departments.map((department) => {
    const subordinates = getSubordinates(departmentList, department);
    const count = [department, ...subordinates].reduce((sum, name) => {
      return sum + (orgMap.get(name.trim()) || 0);
    }, 0);

    return { departmentName: department, numberOfDatasets: count };
  });
}

function calculateDatasetCountsPerDepartment(
  organizationsData: OrganizationData[],
  departmentName: string,
  subordinates: string[]
) {
  let result = getDatasetCountForMinistry(organizationsData, departmentName);
  subordinates.forEach((subordinate) => {
    result += getDatasetCountForMinistry(organizationsData, subordinate);
  });

  return result;
}

function getDatasetCountForMinistry(
  organizationData: OrganizationData[],
  ministry: string
) {
  return (
    organizationData.find((organization) => organization.title == ministry)
      ?.package_count || 0
  );
}

export function sortDatasetCounts(
  departmentDatasetsCounts: DepartmentDatasetCount[]
): DepartmentDatasetCount[] {
  const sorted = departmentDatasetsCounts.sort(
    (a, b) => b.numberOfDatasets - a.numberOfDatasets
  );
  return sorted;
}
export { DepartmentDatasetCount };

