
import Component from "../components/325";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"Biology 101 (Sample Classroom)","archived":false,"url":"https://classroom.github.com/classrooms/biology-101-sample"},{"id":202,"name":"Chemistry 202 (Test Classroom)","archived":true,"url":"https://classroom.github.com/classrooms/chemistry-202-test"}];
}
