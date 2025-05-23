
import Component from "../components/373";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"usageItems":[{"date":"2025-05-18","product":"Sample Cloud Storage (Test)","sku":"STORAGE-STD-0001","quantity":120,"unitType":"GiB-month","pricePerUnit":0.024,"grossAmount":2.88,"discountAmount":0.29,"netAmount":2.59,"organizationName":"Sample Org (Test)","repositoryName":"sample-repo-test"},{"date":"2025-05-19","product":"Sample Compute Instance (Test)","sku":"COMPUTE-CPU-4X","quantity":1000,"unitType":"vCPU-hour","pricePerUnit":0.015,"grossAmount":15,"discountAmount":1.5,"netAmount":13.5,"organizationName":"Sample Org (Test)"}]};
}
