import { renderFile } from "ejs";
import path from "path";
import { DepartmentDatasetCount } from "../interfaces/IOrganization";

// ✅ Render using external template for maintainability
export async function renderDepartmentDatasetCounts(
  departmentDatasetCounts: DepartmentDatasetCount[]
): Promise<string> {
  const filePath = path.join(__dirname, "..", "views", "dashboard.ejs");
  return await renderFile(filePath, { departmentDatasetCounts });
}
