import axios from "axios";
import { OrganizationData } from "../interfaces/IOrganization";

const govDataAllOrganizationsURL =
  "https://www.govdata.de/ckan/api/3/action/organization_list?all_fields=true&include_dataset_count=true";

// ✅ Interface for expected API response
export interface GovDataCkanAllOrganizationResult {
  success: boolean;
  result: OrganizationData[];
}

// ✅ Fetch all organizations with dataset counts
export async function fetchAllOrganizationData(): Promise<GovDataCkanAllOrganizationResult> {
  const response = await axios.get(govDataAllOrganizationsURL);
  return {
    success: response.data.success,
    result: response.data.result,
  };
}
