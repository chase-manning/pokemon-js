import { useDispatch, useSelector } from "react-redux";
import "./gameboy.css";
import {
  selectMovingDown,
  selectMovingLeft,
  selectMovingRight,
  selectMovingUp,
  startMovingDown,
  startMovingLeft,
  startMovingRight,
  startMovingUp,
  stopMovingDown,
  stopMovingLeft,
  stopMovingRight,
  stopMovingUp,
} from "../state/gameSlice";

interface Props {
  children?: React.ReactNode;
}

const Gameboy = ({ children }: Props) => {
  const dispatch = useDispatch();

  const movingLeft = useSelector(selectMovingLeft);
  const movingUp = useSelector(selectMovingUp);
  const movingRight = useSelector(selectMovingRight);
  const movingDown = useSelector(selectMovingDown);

  const moving = movingLeft || movingUp || movingRight || movingDown;

  return (
    <div className="gameboy" id="GameBoy">
      <div className="display-section">
        <div className="screen-area">
          <div className="power">
            <div className="indicator">
              <div className="led"></div>
              <span className="arc" style={{ zIndex: 2 }}></span>
              <span className="arc" style={{ zIndex: 1 }}></span>
              <span className="arc" style={{ zIndex: 0 }}></span>
            </div>
            POWER
          </div>

          <div className="display">{children}</div>

          <div className="label">
            <div className="title">GAME BOY</div>
            <div className="subtitle">
              <span className="c">C</span>
              <span className="o1">O</span>
              <span className="l">L</span>
              <span className="o2">O</span>
              <span className="r">R</span>
            </div>
          </div>
        </div>

        <div className="nintendo">Nintendo</div>
      </div>
      <div className="control-section">
        <div className="controls">
          <div className="dpad">
            <div
              className="up"
              onTouchStart={() => {
                if (moving) return;
                dispatch(startMovingUp());
              }}
              onTouchEnd={() => {
                dispatch(stopMovingUp());
              }}
            >
              <i className="fa fa-caret-up"></i>
            </div>
            <div
              className="right"
              onTouchStart={() => {
                if (moving) return;
                dispatch(startMovingRight());
              }}
              onTouchEnd={() => {
                dispatch(stopMovingRight());
              }}
            >
              <i className="fa fa-caret-right"></i>
            </div>
            <div
              className="down"
              onTouchStart={() => {
                if (moving) return;
                dispatch(startMovingDown());
              }}
              onTouchEnd={() => {
                dispatch(stopMovingDown());
              }}
            >
              <i className="fa fa-caret-down"></i>
            </div>
            <div
              className="left"
              onTouchStart={() => {
                if (moving) return;
                dispatch(startMovingLeft());
              }}
              onTouchEnd={() => {
                dispatch(stopMovingLeft());
              }}
            >
              <i className="fa fa-caret-left"></i>
            </div>
            <div className="middle"></div>
          </div>
          <div className="a-b">
            <div className="b">B</div>
            <div className="a">A</div>
          </div>
        </div>

        <div className="start-select">
          <div className="select">SELECT</div>
          <div className="start">START</div>
        </div>
      </div>

      <div className="speaker">
        <div className="dot placeholder"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot placeholder"></div>

        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>

        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>

        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>

        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>

        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>

        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>

        <div className="dot placeholder"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot closed"></div>
        <div className="dot open"></div>
        <div className="dot placeholder"></div>
      </div>
    </div>
  );
};

export default Gameboy;
