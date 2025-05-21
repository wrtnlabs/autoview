
import Component from "../components/330";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"smile":"https://api.example.com/emojis/unicode/1f600.png","thumbsup":"https://api.example.com/emojis/unicode/1f44d.png","party_parrot":"https://media.example.com/emojis/party_parrot.gif","rocket":"https://api.example.com/emojis/unicode/1f680.png","bug":"https://api.example.com/emojis/unicode/1f41b.png"};
}
