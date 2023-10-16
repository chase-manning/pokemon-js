import { useEffect, useState } from "react";
import { db } from "./db";
import { collection, getDocs } from "firebase/firestore";

const useLatestSave = () => {
  const [save, setSave] = useState<string | null>(null);

  useEffect(() => {
    const getSave = async () => {
      const collection_ = collection(db, "lien");
      const saves = await getDocs(collection_);
      const saveData = saves.docs.map((doc) => doc.data());
      if (saveData.length === 0) return;
      const latestSave = saveData.sort((a, b) => b.timestamp - a.timestamp)[0];
      setSave(latestSave.gameState);
    };

    getSave();
  }, []);

  return save;
};

export default useLatestSave;
