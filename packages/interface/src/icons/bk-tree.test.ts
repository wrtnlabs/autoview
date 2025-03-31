import { expect, test } from "vitest";

import { BkTree } from "./bk-tree";
import { buildBkTree } from "./build-bk-tree";
import { levenshteinDistance } from "./levenshtein-distance";

function buildTree(terms: string[]) {
  const rootNode = buildBkTree(terms, levenshteinDistance);
  return new BkTree(rootNode, levenshteinDistance);
}

test("find exact match", () => {
  const tree = buildTree(["hello", "world", "hi", "bye"]);
  const result = tree.findNearest("hello");
  expect(result.node.term).toBe("hello");
  expect(result.distance).toBe(0);
});

test("find nearest #1 (deletion)", () => {
  const tree = buildTree(["hello", "world", "hi", "bye"]);
  const result = tree.findNearest("hell");
  expect(result.node.term).toBe("hello");
  expect(result.distance).toBe(1);
});

test("find nearest #2 (substitution)", () => {
  const tree = buildTree(["hello", "world", "hi", "bye"]);
  const result = tree.findNearest("helo");
  expect(result.node.term).toBe("hello");
  expect(result.distance).toBe(1);
});

test("find nearest #3 (insertion)", () => {
  const tree = buildTree(["hell", "world", "hi", "bye"]);
  const result = tree.findNearest("hello");
  expect(result.node.term).toBe("hell");
  expect(result.distance).toBe(1);
});

test("empty tree should be throw error", () => {
  expect(() => buildTree([])).toThrow();
});

test("search in a single node tree", () => {
  const tree = buildTree(["apple"]);

  let result = tree.findNearest("apple");
  expect(result.node.term).toBe("apple");
  expect(result.distance).toBe(0);

  result = tree.findNearest("apply");
  expect(result.node.term).toBe("apple");
  expect(result.distance).toBe(1);

  result = tree.findNearest("orange");
  expect(result.node.term).toBe("apple");
  expect(result.distance).toBe(5);
});

test("case insensitive search (due to levenshteinDistance)", () => {
  const tree = buildTree(["Apple", "Banana", "Orange"]);
  const result = tree.findNearest("APPLe");
  expect(result.node.term).toBe("Apple");
  expect(result.distance).toBe(0);

  const result2 = tree.findNearest("apricot");
  expect(result2).not.toBeNull();
  expect(result2!.node.term).toBe("Apple");
  expect(result2!.distance).toBe(5);
});

test("multiple equidistant nearest neighbors", () => {
  const tree = buildTree(["book", "boot", "boon", "cook"]);
  const result = tree.findNearest("boat");
  expect(["book", "boot"]).toContain(result.node.term);
  expect(result.distance).toBe(1);
});

test("find nearest with larger distance", () => {
  const tree = buildTree(["javascript", "typescript", "python", "java"]);
  const result = tree.findNearest("ruby");
  expect(result.node.term).toBe("java");
  expect(result.distance).toBe(4);
});

test("search with special characters", () => {
  const tree = buildTree(["test!", "test?", "test."]);
  const result = tree.findNearest("test#");
  expect(["test!", "test?", "test."]).toContain(result.node.term);
  expect(result.distance).toBe(1);

  const result2 = tree.findNearest("test");
  expect(result2).not.toBeNull();
  expect(["test!", "test?", "test."]).toContain(result2!.node.term);
  expect(result2!.distance).toBe(1);
});

test("search for an empty string", () => {
  const tree = buildTree(["a", "bc", "def"]);
  const result = tree.findNearest("");
  expect(result.node.term).toBe("a");
  expect(result.distance).toBe(1);
});

test("search with numeric strings", () => {
  const tree = buildTree(["12345", "12300", "54321", "10000"]);
  const result = tree.findNearest("12399");
  expect(["12345", "12300"]).toContain(result.node.term);
  expect(result.distance).toBe(2);
});

test("search with longer and similar words", () => {
  const tree = buildTree([
    "implementation",
    "impression",
    "important",
    "impossible",
    "improvement",
  ]);
  const result = tree.findNearest("impresion");
  expect(result.node.term).toBe("impression");
  expect(result.distance).toBe(1);

  const result2 = tree.findNearest("implausible");
  expect(result2).not.toBeNull();
  expect(result2!.node.term).toBe("impossible");
  expect(result2!.distance).toBe(3);
});
