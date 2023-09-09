import "./gameboy.css";
import emitter, { Event } from "../app/emitter";

interface Props {
  children?: React.ReactNode;
}

const Gameboy = ({ children }: Props) => {
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
              onClick={() => emitter.emit(Event.Up)}
              onTouchStart={() => emitter.emit(Event.StartUp)}
              onTouchEnd={() => emitter.emit(Event.StopUp)}
            >
              <i className="fa fa-caret-up"></i>
            </div>
            <div
              className="right"
              onClick={() => emitter.emit(Event.Right)}
              onTouchStart={() => emitter.emit(Event.StartRight)}
              onTouchEnd={() => emitter.emit(Event.StopRight)}
            >
              <i className="fa fa-caret-right"></i>
            </div>
            <div
              className="down"
              onClick={() => emitter.emit(Event.Down)}
              onTouchStart={() => emitter.emit(Event.StartDown)}
              onTouchEnd={() => emitter.emit(Event.StopDown)}
            >
              <i className="fa fa-caret-down"></i>
            </div>
            <div
              className="left"
              onClick={() => emitter.emit(Event.Left)}
              onTouchStart={() => emitter.emit(Event.StartLeft)}
              onTouchEnd={() => emitter.emit(Event.StopLeft)}
            >
              <i className="fa fa-caret-left"></i>
            </div>
            <div className="middle"></div>
          </div>
          <div className="a-b">
            <div className="b" onClick={() => emitter.emit(Event.B)}>
              B
            </div>
            <div className="a" onClick={() => emitter.emit(Event.A)}>
              A
            </div>
          </div>
        </div>

        <div className="start-select">
          <div className="select">SELECT</div>
          <div className="start" onClick={() => emitter.emit(Event.Start)}>
            START
          </div>
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
