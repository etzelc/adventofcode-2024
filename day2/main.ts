function checkValid(line: number[]): boolean {
  let isSortedAscending = true;
  let isSortedDescending = true;
  for (let i = 1; i < line.length; i++) {
    const diff = Math.abs(line[i] - line[i - 1]);

    if (diff < 1 || diff > 3) {
      return false;
    }

    if (line[i] < line[i - 1]) {
      isSortedAscending = false;
    }
    if (line[i] > line[i - 1]) {
      isSortedDescending = false;
    }
  }
  return isSortedAscending || isSortedDescending;
}

async function calculateValidReports(filePath: string): Promise<void> {
  try {
    const text = await Deno.readTextFile(filePath);

    const lines = text.trim().split("\n");

    const reports = lines.map((line) =>
      line.trim().split(" ").map((num) => parseInt(num))
    );

    const validLines = reports.filter((line) => checkValid(line));

    console.log("Number of valid reports: ", validLines.length);
  } catch (error) {
    console.error("Error processing the file:", error);
  }
}

async function calculateValidReports2(filePath: string): Promise<void> {
  try {
    const text = await Deno.readTextFile(filePath);

    const lines = text.trim().split("\n");

    const reports = lines.map((line) =>
      line.trim().split(" ").map((num) => parseInt(num))
    );

    const validLines = reports.map((lineNumbers) => {
      let modifiedLine = [...lineNumbers];

      let valid = checkValid(modifiedLine);

      if (!valid) {
        for (let i = 0; i < modifiedLine.length; i++) {
          modifiedLine.splice(i, 1);

          valid = checkValid(modifiedLine);

          if (valid) break;

          modifiedLine = [...lineNumbers];
        }
      }

      return valid;
    }).filter((result) => result === true);

    console.log("Number of valid reports: ", validLines.length);
  } catch (error) {
    console.error("Error processing the file:", error);
  }
}

if (import.meta.main) {
  const filePath = "./reports.txt";
  await calculateValidReports(filePath);
  await calculateValidReports2(filePath);
}
