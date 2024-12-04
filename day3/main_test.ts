import { assertEquals } from "@std/assert";
import { sumMul, sumMulWithDoDont } from "./main.ts";

Deno.test(function addTest() {
  const test =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
  assertEquals(sumMul(test), 161);

  const test2 =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
  assertEquals(sumMulWithDoDont(test2), 48);
});
