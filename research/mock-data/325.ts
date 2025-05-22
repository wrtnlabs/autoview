
import Component from "../components/325";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"Intro to Programming (Test)","archived":false,"url":"https://classroom.github.com/classrooms/101-intro-to-programming-test"},{"id":202,"name":"Data Structures Lab (Sample)","archived":true,"url":"https://classroom.github.com/classrooms/202-data-structures-lab-sample"},{"id":303,"name":"Web Development Basics (Sample)","archived":false,"url":"https://classroom.github.com/classrooms/303-web-development-basics-sample"}];
}
