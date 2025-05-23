
import Component from "../components/360";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/marketplace/purchases/12345","type":"marketplace_purchase","id":12345,"login":"sample-user","organization_billing_email":"billing-dept@sample-company.example.org","email":"test.user@example.com","marketplace_pending_change":{"is_installed":false,"effective_date":"2025-08-01","unit_count":10,"id":54321,"plan":{"url":"https://www.example.com/plans/201","accounts_url":"https://api.example.org/plans/201/accounts","id":201,"number":2,"name":"Pro Plan (Sample)","description":"A pro tier plan for sample testing purposes.","monthly_price_in_cents":2000,"yearly_price_in_cents":20000,"price_model":"FLAT_RATE","has_free_trial":true,"unit_name":"seat","state":"published","bullets":["Includes advanced features","Priority support (Sample)","Unlimited usage in sandbox"]}},"marketplace_purchase":{"billing_cycle":"monthly","next_billing_date":"2025-06-19","is_installed":true,"unit_count":null,"on_free_trial":true,"free_trial_ends_on":"2025-07-19","updated_at":"2025-05-19T12:00:00Z","plan":{"url":"https://www.example.com/plans/101","accounts_url":"https://api.example.org/plans/101/accounts","id":101,"number":1,"name":"Basic Plan (Test)","description":"Basic plan for demonstration.","monthly_price_in_cents":1000,"yearly_price_in_cents":10000,"price_model":"FLAT_RATE","has_free_trial":false,"unit_name":null,"state":"published","bullets":["Access to basic features","Community support"]}}};
}
