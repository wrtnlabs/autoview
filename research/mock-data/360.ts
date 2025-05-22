
import Component from "../components/360";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/marketplace/purchases/12345","type":"marketplace_purchase","id":12345,"login":"test-seller-account","organization_billing_email":"billing+test@example.com","email":"developer.user@example.org","marketplace_pending_change":{"id":1,"is_installed":false,"effective_date":"2025-06-01T00:00:00Z","unit_count":3,"plan":{"url":"https://api.example.com/marketplace_listing/plans/1","accounts_url":"https://api.example.com/marketplace_listing/plans/1/accounts","id":1,"number":1,"name":"Sample Plan (Test)","description":"A sample marketplace plan used for UI testing.","monthly_price_in_cents":499,"yearly_price_in_cents":4990,"price_model":"FLAT_RATE","has_free_trial":true,"unit_name":"seat","state":"active","bullets":["Test bullet one","Test bullet two"]}},"marketplace_purchase":{"billing_cycle":"monthly","next_billing_date":"2025-06-15","is_installed":true,"unit_count":5,"on_free_trial":true,"free_trial_ends_on":"2025-05-31","updated_at":"2025-05-19T12:00:00Z","plan":{"url":"https://api.example.com/marketplace_listing/plans/2","accounts_url":"https://api.example.com/marketplace_listing/plans/2/accounts","id":2,"number":2,"name":"Pro Plan (Test)","description":"Pro tier plan for sample testing.","monthly_price_in_cents":999,"yearly_price_in_cents":9990,"price_model":"PER_UNIT","has_free_trial":false,"unit_name":"user","state":"active","bullets":["Pro feature A (Sample)","Pro feature B (Sample)"]}}};
}
