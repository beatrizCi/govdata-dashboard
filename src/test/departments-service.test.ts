import { expect } from "chai";
import { DepartmentList } from "../interfaces";
import { getMinistriesNames, getSubordinates } from "../services/departments-service";


describe("departments-service", () => {
  const departmentList: DepartmentList = {
    departments: [
      {
        name: "Ministry A",
        subordinates: [{ name: "Sub A1" }, { name: "Sub A2" }],
      },
      {
        name: "Ministry B",
      },
    ],
  };

  it("should return all ministry names", () => {
    const result = getMinistriesNames(departmentList);
    expect(result).to.deep.equal(["Ministry A", "Ministry B"]);
  });

  it("should return subordinates of a given ministry", () => {
    const result = getSubordinates(departmentList, "Ministry A");
    expect(result).to.deep.equal(["Sub A1", "Sub A2"]);
  });

  it("should return an empty array if no subordinates are found", () => {
    const result = getSubordinates(departmentList, "Ministry B");
    expect(result).to.deep.equal([]);
  });

  it("should handle non-existent ministry gracefully", () => {
    const result = getSubordinates(departmentList, "Ministry X");
    expect(result).to.deep.equal([]);
  });
});
