
import Component from "../components/373";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"usageItems":[{"date":"2025-05-18","product":"SuperCompute Engine (Test)","sku":"vCPU_Hours_Sample","quantity":100,"unitType":"vCPU hours","pricePerUnit":0.05,"grossAmount":5,"discountAmount":0.5,"netAmount":4.5,"organizationName":"Acme Corp (Sample)","repositoryName":"compute-usage-repo-sample"},{"date":"2025-05-17","product":"Data Storage (Test)","sku":"Standard_SSD_Sample","quantity":500,"unitType":"GB month","pricePerUnit":0.1,"grossAmount":50,"discountAmount":5,"netAmount":45,"organizationName":"Acme Corp (Sample)"}]};
}
