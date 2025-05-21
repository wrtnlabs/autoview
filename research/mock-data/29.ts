
import Component from "../components/29";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"writer":{"id":"cust-1001","type":"customer","name":"Sample Customer (Test)"},"id":"a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6","parent_id":null,"snapshots":[{"id":"c56a4180-65aa-42ec-a945-5fd21dec0538","created_at":"2025-05-18T09:15:00Z","format":"md","body":"Hello, I'm interested in this product. Could you provide more details about its warranty? (Test comment)","files":[{"name":"warranty_image","extension":"jpg","url":"https://www.example.com/files/sample-warranty-image-test.jpg"}]},{"id":"d56a4180-65aa-42ec-b945-5fd21dec0538","created_at":"2025-05-18T10:00:00Z","format":"md","body":"Hello, I'm interested in this product. Could you provide more details about its warranty and return policy? (Edited for clarity)","files":[]}],"created_at":"2025-05-18T09:15:00Z"},{"writer":{"id":"seller-2001","type":"seller","name":"Sample Seller Inc. (Test)"},"id":"e2f60f6e-2345-4c2b-9a9d-1ef223456780","parent_id":"a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6","snapshots":[{"id":"f67a4180-75bb-53ec-b945-6fd21dec0538","created_at":"2025-05-18T11:30:00Z","format":"txt","body":"I'm a seller here. The product comes with a one-year warranty and free shipping. Let me know if you have more questions. (Seller reply)","files":[]}],"created_at":"2025-05-18T11:30:00Z"}]};
}
