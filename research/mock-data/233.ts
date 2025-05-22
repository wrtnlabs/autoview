
import Component from "../components/233";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"event":{"userId":"user_12345_test","id":"evt_0001_test","channelId":"channel_alpha_test","name":"Sample Event (Test)","property":{"sampleProperty":{"key1":"value1"},"nestedProperty":{}},"createdAt":1620000000000,"expireAt":1622592000000,"managed":false,"version":1,"nameI18nMap":{"en":"Sample Event (Test)","es":"Evento de Prueba (Muestra)"}}};
}
