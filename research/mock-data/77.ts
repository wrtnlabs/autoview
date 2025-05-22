
import Component from "../components/77";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"deposit":100,"mileage":50,"combinations":[{"coupons":[],"tickets":[],"entries":[{"commodity_id":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","pseudo":false,"coupon_id":"123e4567-e89b-12d3-a456-426614174000","amount":30},{"commodity_id":"0fedcba9-8765-4321-0fed-cba987654321","pseudo":true,"coupon_id":"0a1b2c3d-4e5f-6789-abcd-ef0123456789","amount":20}],"amount":50}]};
}
