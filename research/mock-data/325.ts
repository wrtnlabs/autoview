
import Component from "../components/325";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":42,"name":"Sample Classroom A (Test)","archived":false,"url":"https://classroom.github.com/classrooms/42-sample-classroom"},{"id":101,"name":"Advanced Testing Class (Sample)","archived":true,"url":"https://classroom.github.com/classrooms/101-advanced-testing-class"}];
}
