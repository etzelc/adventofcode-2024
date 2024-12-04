async function calculateMetrics(filePath: string): Promise<void> {
  try {
    const text = await Deno.readTextFile(filePath);
    const lines = text.trim().split("\n");
    const col1Numbers: number[] = [];
    const col2Numbers: number[] = [];

    for (const line of lines) {
      const [col1, col2] = line.trim().split(/\s+/);
      if (col1 && col2) {
        col1Numbers.push(Number(col1));
        col2Numbers.push(Number(col2));
      }
    }
    col1Numbers.sort((a, b) => a - b);
    col2Numbers.sort((a, b) => a - b);

    let totalDistance: number = 0;
    let totalSimilarity: number = 0;
    for (let i = 0; i < col1Numbers.length; i++) {
      totalDistance += Math.abs(col1Numbers[i] - col2Numbers[i]);
      totalSimilarity += col1Numbers[i] *
        col2Numbers.filter((col2Num) => col2Num === col1Numbers[i]).length;
    }

    console.log("Total Distance:", totalDistance);
    console.log("Total Similarity:", totalSimilarity);
  } catch (error) {
    console.error("Error processing the file:", error);
  }
}

if (import.meta.main) {
  const filePath = "./numbers.txt";
  await calculateMetrics(filePath);
}
