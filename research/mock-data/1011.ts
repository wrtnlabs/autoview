
import Component from "../components/1011";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIN0M5nQGp1zKlx4YrYOx8PUYFgZzJYF1QxYz5c8NRx7 test-user@example.com","id":101,"title":"Test SSH Key 1 (Sample)","created_at":"2025-05-18T09:15:30Z"},{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3vMnR7Zl9lv7XU3U6G1vW0fDh7bT+u5y3j2F8C0YUfKz8pI3aB1tQ9ZbFbJE3Q7eHcl2kLzXy9pQWSU3pTq4RqjN5TcF sample-key@example.org","id":102,"title":"Sample SSH Key 2 (Test)","created_at":"2025-05-19T12:45:00Z"}];
}
