export function xmas1(text: string): number {

  const searchWord = (grid: string[], word: string) => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
      [0, -1],
      [-1, 0],
      [-1, -1],
      [-1, 1],
    ];

    const isWordAt = (row: number, col: number, dir: number[]) => {
      for (let i = 0; i < word.length; i++) {
        const newRow = row + dir[0] * i;
        const newCol = col + dir[1] * i;

        if (
          newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols
        ) {
          return false;
        }

        if (grid[newRow][newCol] !== word[i]) {
          return false;
        }
      }
      return true;
    };

    const foundPositions = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        for (const dir of directions) {
          if (isWordAt(row, col, dir)) {
            foundPositions.push({ row, col, direction: dir });
          }
        }
      }
    }

    return foundPositions;
  };


  const lines = text.trim().split("\n");
  const positions = searchWord(lines, "XMAS");

  return positions.length;
}

export function xmas2(text: string): number {
  const grid = text.trim().split("\n");

  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;

  const isXPattern = (row: number, col: number): boolean => {
    if (
      row - 1 >= 0 && row + 1 < numRows &&
      col - 1 >= 0 && col + 1 < numCols
    ) {
      return (
        grid[row][col] === "A" &&
        ((grid[row - 1][col - 1] === "M" &&
          grid[row + 1][col + 1] === "S") ||
          (grid[row - 1][col - 1] === "S" &&
            grid[row + 1][col + 1] === "M")) &&
        ((grid[row - 1][col + 1] === "M" &&
          grid[row + 1][col - 1] === "S") ||
          (grid[row - 1][col + 1] === "S" &&
            grid[row + 1][col - 1] === "M"))
      );
    }
    return false;
  };

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (isXPattern(row, col)) {
        count++;
      }
    }
  }

  return count;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = await Deno.readTextFile("input1.txt");
  console.log("#XMAS", xmas1(text));
  console.log("X-MAS", xmas2(text));
}
