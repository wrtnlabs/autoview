
import Component from "../components/625";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"key_prefix":"TICKET-","url_template":"https://support.example.com/tickets/{key}","is_alphanumeric":false};
}
