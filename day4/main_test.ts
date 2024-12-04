import { assertEquals } from "@std/assert";
import { xmas1 } from "./main.ts";

Deno.test(function xmas1Test() {
  const text = Deno.readTextFileSync("test.txt");
  assertEquals(xmas1(text), 18);
});
