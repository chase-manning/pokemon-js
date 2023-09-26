import { useDispatch, useSelector } from "react-redux";
import { selectMap, selectPos } from "../state/gameSlice";
import { useEffect } from "react";
import { startSpinning, stopSpinning } from "../state/uiSlice";

const SpinningHandler = () => {
  const dispatch = useDispatch();
  const pos = useSelector(selectPos);
  const map = useSelector(selectMap);

  useEffect(() => {
    if (map.spinners && map.spinners[pos.y] && map.spinners[pos.y][pos.x]) {
      dispatch(startSpinning(map.spinners[pos.y][pos.x]));
    } else if (
      map.stoppers &&
      map.stoppers[pos.y] &&
      map.stoppers[pos.y].includes(pos.x)
    ) {
      dispatch(stopSpinning());
    }
  }, [pos, map.spinners, dispatch, map.stoppers]);

  return null;
};

export default SpinningHandler;
