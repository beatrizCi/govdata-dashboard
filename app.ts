import express from "express";
import departmentList from "./src/data/departments.json";
import {
  getDatasetCounts,
  sortDatasetCounts,
} from "./src/services/govdata-ckan-service";
import { renderDepartmentDatasetCounts } from "./src/services/rendering-service";
import { fetchAllOrganizationData } from "./src/clients/govdata-ckan-client";
import { OrganizationData } from "./src/interfaces/IOrganization";
import { DepartmentList } from "./src/interfaces/IDepartment";

const app = express();

//  Main dashboard route: fetch + render
app.get("/", async function (req, res) {
  try {
    const organizations: OrganizationData[] = (await fetchAllOrganizationData())
      .result;

    const datasetCounts = getDatasetCounts(
      departmentList as DepartmentList,
      organizations
    );

    const sortedCounts = sortDatasetCounts(datasetCounts);
    const html = await renderDepartmentDatasetCounts(sortedCounts);

    res.send(html);
  } catch (error) {
    console.error("Error rendering dashboard:", error);
    res.status(500).send("Failed to generate dashboard");
  }
});

//  Health check endpoint
app.get("/health", (req, res) => res.status(200).send("OK"));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

export default app;
