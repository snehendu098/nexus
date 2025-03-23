export const divideToolsArray = <T>(tools: T[]): [T[], T[]] => [
  tools.slice(0, 9),
  tools.slice(9),
];

// EG: const [firstTools, remainingTools] = divideToolsArray(tools);
