import { expect, test } from "vitest";

import { levenshteinDistance } from "./levenshtein-distance";

test("distance between identical strings is 0", () => {
  expect(levenshteinDistance("hello", "hello")).toBe(0);
});

test("distance between identical strings with different cases is 0", () => {
  expect(levenshteinDistance("Hello", "hello")).toBe(0);
  expect(levenshteinDistance("HELLO", "hello")).toBe(0);
  expect(levenshteinDistance("HeLlO", "hElLo")).toBe(0);
});

test("distance with one insertion is 1", () => {
  expect(levenshteinDistance("hell", "hello")).toBe(1);
  expect(levenshteinDistance("helo", "hello")).toBe(1);
  expect(levenshteinDistance("hllo", "hello")).toBe(1);
  expect(levenshteinDistance("ello", "hello")).toBe(1);
});

test("distance with one deletion is 1", () => {
  expect(levenshteinDistance("hello", "hell")).toBe(1);
  expect(levenshteinDistance("hello", "helo")).toBe(1);
  expect(levenshteinDistance("hello", "hllo")).toBe(1);
  expect(levenshteinDistance("hello", "ello")).toBe(1);
});

test("distance with one substitution is 1", () => {
  expect(levenshteinDistance("hello", "hallo")).toBe(1);
  expect(levenshteinDistance("hello", "hillo")).toBe(1);
  expect(levenshteinDistance("hello", "helko")).toBe(1);
  expect(levenshteinDistance("cat", "hat")).toBe(1);
});

test("distance between 'kitten' and 'sitting' is 3", () => {
  expect(levenshteinDistance("kitten", "sitting")).toBe(3);
});

test("distance between 'flaw' and 'lawn' is 2", () => {
  expect(levenshteinDistance("flaw", "lawn")).toBe(2);
});

test("distance between 'book' and 'back' is 2", () => {
  expect(levenshteinDistance("book", "back")).toBe(2);
});

test("distance when one string is empty", () => {
  expect(levenshteinDistance("", "hello")).toBe(5);
  expect(levenshteinDistance("world", "")).toBe(5);
});

test("distance when both strings are empty", () => {
  expect(levenshteinDistance("", "")).toBe(0);
});

test("distance with numeric strings", () => {
  expect(levenshteinDistance("12345", "12345")).toBe(0);
  expect(levenshteinDistance("12345", "12305")).toBe(1);
  expect(levenshteinDistance("123", "456")).toBe(3);
});

test("distance with special characters", () => {
  expect(levenshteinDistance("!@#$", "!@#$")).toBe(0);
  expect(levenshteinDistance("!@#$", "%^&*")).toBe(4);
  expect(levenshteinDistance("test!", "test?")).toBe(1);
});

test("distance with spaces", () => {
  expect(levenshteinDistance("hello world", "hello world")).toBe(0);
  expect(levenshteinDistance("hello world", "hello_world")).toBe(1);
  expect(levenshteinDistance("hello world", "helloworld")).toBe(1);
  expect(levenshteinDistance("helloworld", "hello world")).toBe(1);
});

test("distance with leading/trailing spaces", () => {
  expect(levenshteinDistance(" hello", "hello")).toBe(1);
  expect(levenshteinDistance("hello ", "hello")).toBe(1);
  expect(levenshteinDistance(" hello ", "hello")).toBe(2);
});

test("distance between strings of different lengths", () => {
  expect(levenshteinDistance("abc", "abcdef")).toBe(3);
  expect(levenshteinDistance("abcdef", "abc")).toBe(3);
  expect(levenshteinDistance("apple", "apply")).toBe(1);
});

test("distance between very different strings", () => {
  expect(levenshteinDistance("javascript", "typescript")).toBe(4);
  expect(levenshteinDistance("algorithm", "logarithm")).toBe(3);
});

test("distance between strings with transposed characters", () => {
  expect(levenshteinDistance("abc", "acb")).toBe(2);
  expect(levenshteinDistance("hello", "hlelo")).toBe(2);
});

test("distance with repeating characters", () => {
  expect(levenshteinDistance("aaaaa", "bbbbb")).toBe(5);
  expect(levenshteinDistance("aaabbb", "aaaccc")).toBe(3);
  expect(levenshteinDistance("banana", "bandana")).toBe(1);
});

test("distance with unicode characters", () => {
  expect(levenshteinDistance("你好", "你好")).toBe(0);
  expect(levenshteinDistance("你好世界", "你好世界!")).toBe(1);
  expect(levenshteinDistance("你好", "再见")).toBe(2);
});

test("distance with strings containing only spaces", () => {
  expect(levenshteinDistance(" ", " ")).toBe(0);
  expect(levenshteinDistance(" ", "  ")).toBe(1);
  expect(levenshteinDistance("  ", " ")).toBe(1);
  expect(levenshteinDistance("   ", "")).toBe(3);
  expect(levenshteinDistance("", "   ")).toBe(3);
});

test("distance with mixed case and other differences", () => {
  expect(levenshteinDistance("Vitest", "Jest")).toBe(3);
  expect(levenshteinDistance("TestCase", "test_case")).toBe(1);
});

test("distance with longer strings", () => {
  const s1 = "this is a long test string";
  const s2 = "this is another long test string";
  expect(levenshteinDistance(s1, s2)).toBe(6);
});

test("distance with combined operations", () => {
  expect(levenshteinDistance("sunday", "saturday")).toBe(3);
});

test("distance when same characters are in different positions", () => {
  expect(levenshteinDistance("google", "goolge")).toBe(2);
});
