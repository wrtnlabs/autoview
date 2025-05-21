
import Component from "../components/373";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"usageItems":[{"date":"2025-05-18","product":"Compute Instance Hours (Sample)","sku":"compute_standard_dummy","quantity":120,"unitType":"vCPU-hour","pricePerUnit":0.05,"grossAmount":6,"discountAmount":1.2,"netAmount":4.8,"organizationName":"Sample Organization (Test)","repositoryName":"demo-repo-test"},{"date":"2025-05-19","product":"Block Storage (Test)","sku":"storage_block_premium","quantity":50,"unitType":"GB-month","pricePerUnit":0.1,"grossAmount":5,"discountAmount":0,"netAmount":5,"organizationName":"Example Organization (Sample)"}]};
}
