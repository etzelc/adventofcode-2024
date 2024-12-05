import { assertEquals } from "@std/assert";
import { validateManualsUpdates,calculateMiddleValueValid } from "./main.ts";

Deno.test(function middlePageSumTest() {
  const text = Deno.readTextFileSync("test.txt");
  const validatedList = validateManualsUpdates(text);
  assertEquals(calculateMiddleValueValid(validatedList.results), 143);
});
