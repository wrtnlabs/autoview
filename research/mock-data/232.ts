
import Component from "../components/232";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"prev":"cursor_prev_test_12345","next":"cursor_next_test_67890","events":[{"userId":"user_abc123_sample","id":"evt_001_sample","channelId":"channel_XYZ_test","name":"UserSignedUp (Test Event)","property":{"referrer":{},"campaign":{}},"createdAt":1687184729000,"expireAt":1689786729000,"managed":false,"version":1,"nameI18nMap":{"en":"User Signed Up (Sample)","es":"Usuario Registrado (Prueba)","fr":"Utilisateur Inscrit (Test)"}},{"name":"PasswordResetRequested (Test Event)","managed":true,"version":2,"nameI18nMap":{"en":"Password Reset Requested (Sample)","de":"Passwort Zurückgesetzt Angefordert (Test)"}}]};
}
