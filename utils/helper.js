export const winPercentage = (wins, losses) => {
  return `${((wins / (wins + losses)) * 100).toFixed(1)} %`;
};
