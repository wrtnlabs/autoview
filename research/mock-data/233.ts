
import Component from "../components/233";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"event":{"userId":"test_user_12345","id":"evt_sample_001","channelId":"channel_dummy_01","name":"Sample Event for UI Testing","property":{"featureToggle":{},"metadata":{}},"createdAt":1737167400000,"expireAt":1739769400000,"managed":true,"version":1,"nameI18nMap":{"en":"Sample Event","es":"Evento de Muestra"}}};
}
