
import Component from "../components/233";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"event":{"userId":"user_12345_sample","id":"evt_abc123_sample","channelId":"channel_test_alpha","name":"Sample Test Event (Dummy)","property":{"config":{},"metadata":{}},"createdAt":1716145800000,"expireAt":1716750600000,"managed":false,"version":1,"nameI18nMap":{"en-US":"Sample Test Event","es-ES":"Evento de Prueba de Muestra"}}};
}
