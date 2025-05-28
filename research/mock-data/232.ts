
import Component from "../components/232";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"prev":"token_page_1_prev_abcdef","next":"token_page_3_next_ghijkl","events":[{"userId":"user_sample_001","id":"event_12345","name":"Sample Event Name (Test)","createdAt":1716096000000,"managed":false,"version":1,"nameI18nMap":{"en":"Sample Event Name (EN)","es":"Nombre de Evento de Ejemplo (ES)"}},{"channelId":"channel_dummy_01","name":"Another Test Event","property":{"details":{},"metadata":{}},"expireAt":1718688000000,"managed":true}]};
}
