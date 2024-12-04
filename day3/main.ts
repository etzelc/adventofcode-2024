export function sumMul(text: string): number {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  let total = 0;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    total += num1 * num2;
  }

  return total;
}

export function sumMulWithDoDont(text: string): number {
  const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;

  let total = 0;

  const matches = text.match(regex);
  let dont = false;

  if (matches) {
    matches.forEach((match) => {
      //console.log(match)
      if (!dont && match.startsWith("mul")) {
        const [, num1, num2] = match.match(/mul\((\d{1,3}),(\d{1,3})\)/)!;
        total += parseInt(num1, 10) * parseInt(num2, 10);
      } else if (match === "do()") {
        dont = false;
      } else if (match === "don't()") {
        dont = true;
      }
    });
  }

  return total;
}

if (import.meta.main) {

  const filePath = "./mul_program.txt";

  const text = await Deno.readTextFile(filePath);
  console.log("First: ", sumMul(text));
  console.log("Second: ", sumMulWithDoDont(text));
}
