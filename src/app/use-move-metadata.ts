import moveMetadata from "./move-metadata";

export const getMoveMetadata = (moveId: string) => {
  return moveMetadata[moveId];
};

const useMoveMetadata = (moveId: string | null) => {
  if (!moveId) return null;
  return getMoveMetadata(moveId);
};

export default useMoveMetadata;
