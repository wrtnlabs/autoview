
import Component from "../components/330";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"grinning":"https://www.example.com/emojis/grinning.png","heart_eyes":"https://cdn.example.org/emojis/heart_eyes.png","party_parrot":"https://media.example.net/emojis/party_parrot.gif","test_emoji_dummy":"https://api.example.com/emojis/test_emoji_dummy.png"};
}
