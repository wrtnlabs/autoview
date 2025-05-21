
import Component from "../components/363";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/marketplace_purchases/123","type":"marketplace_purchase","id":123,"login":"test-user-sample","organization_billing_email":"billing-team@example.com","email":"test.user@example.org","marketplace_pending_change":{"is_installed":false,"effective_date":"2025-06-01T00:00:00Z","unit_count":null,"id":43},"marketplace_purchase":{"billing_cycle":"monthly","next_billing_date":"2025-06-15T00:00:00Z","is_installed":true,"unit_count":10,"on_free_trial":true,"free_trial_ends_on":"2025-05-31T00:00:00Z","updated_at":"2025-05-19T14:55:00Z","plan":{"url":"https://api.example.com/marketplace_listing_plans/42","accounts_url":"https://api.example.com/marketplace_listing_plans/42/accounts","id":42,"number":1,"name":"Sample Basic Plan","description":"A sample description for the Basic Plan. For UI testing only.","monthly_price_in_cents":500,"yearly_price_in_cents":5000,"price_model":"FLAT_RATE","has_free_trial":true,"unit_name":"seat","state":"active","bullets":["Unlimited sample access to basic features","Email support for test accounts","Monthly updates included"]}}};
}
