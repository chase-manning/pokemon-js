const getLevelData = (
  currentLevel: number,
  currentExp: number,
  leveledUp = false
): { level: number; leveledUp: boolean; remainingXp: number } => {
  const nextLevel = currentLevel + 1;
  const nextLevelXp = Math.pow(nextLevel, 3);
  if (currentExp >= nextLevelXp) {
    return getLevelData(nextLevel, currentExp - nextLevelXp, true);
  }
  return {
    level: currentLevel,
    leveledUp: leveledUp,
    remainingXp: currentExp,
  };
};

export default getLevelData;
