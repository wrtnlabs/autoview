
import Component from "../components/330";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"smile":"https://cdn.example.com/emojis/smile.png","thumbsup":"https://cdn.example.com/emojis/thumbsup.png","heart_eyes":"https://cdn.example.com/emojis/heart_eyes.png","rocket":"https://cdn.example.com/emojis/rocket.png","tada":"https://cdn.example.com/emojis/tada.png"};
}
