import { expect } from "chai";
import { DepartmentList, OrganizationData } from "../interfaces";
import {
  getDatasetCounts,
  sortDatasetCounts,
} from "../services/govdata-ckan-service";

describe("govdata-ckan-service", () => {
  const departments: DepartmentList = {
    departments: [
      {
        name: "Ministry A",
        subordinates: [{ name: "Sub A1" }],
      },
      { name: "Ministry B" },
    ],
  };

  const organizations: OrganizationData[] = [
    { title: "Ministry A", package_count: 10 },
    { title: "Sub A1", package_count: 5 },
    { title: "Ministry B", package_count: 8 },
  ];

  it("should correctly count datasets for ministries and subordinates", () => {
    const result = getDatasetCounts(departments, organizations);
    expect(result).to.deep.equal([
      { departmentName: "Ministry A", numberOfDatasets: 15 },
      { departmentName: "Ministry B", numberOfDatasets: 8 },
    ]);
  });

  it("should sort departments by dataset count", () => {
    const unsorted = [
      { departmentName: "X", numberOfDatasets: 2 },
      { departmentName: "Y", numberOfDatasets: 10 },
    ];
    const sorted = sortDatasetCounts(unsorted);
    expect(sorted[0].departmentName).to.equal("Y");
  });

  it("should ignore non-matching org names", () => {
    const brokenData: OrganizationData[] = [
      { title: "  Ministry A ", package_count: 100 },
      { title: "Ministry C", package_count: 99 },
    ];
    const result = getDatasetCounts(departments, brokenData);
    expect(result[0].numberOfDatasets).to.equal(100);
  });

  it("should treat missing package_count as 0", () => {
    type LooseOrg = { title: string; package_count?: number };
    const broken: LooseOrg[] = [{ title: "Ministry A" }];
    const result = getDatasetCounts(departments, broken as OrganizationData[]);
    expect(result[0].numberOfDatasets).to.equal(0);
  });

  it("should return empty array if department list is empty", () => {
    const result = getDatasetCounts({ departments: [] }, organizations);
    expect(result).to.deep.equal([]);
  });
});
