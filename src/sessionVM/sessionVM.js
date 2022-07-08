import Emu from "../interpeter/emu.js";
import program from "../interpeter/program.js";

class SessionVM{
  get userID() {
    return this._userID;
  }

  get lastAccessTime() {
    return this._lastAccessTime.getTime();
  }

  set lastAccessTime(value) {
    this._lastAccessTime = value;
  }

  set resultBuffer(value){
    this._resultBuffer = value;
  }

  get resultBuffer() {
    return this._resultBuffer;
  }

  constructor(userID, botID) {
    this._userID = userID;
    this.botID = botID;
    this.createTime = new Date();
    this._lastAccessTime = new Date();
    this.emulator = new Emu();
    this._resultBuffer = "";
    this.timer = null;

    this.emulator.console.display = (buffer) => {
      this._resultBuffer = buffer
    };
    this.emulator.uxn.load(program).eval(0x0100);
  }

  inputNewCommand(cmd) {
    for (let i = 0; i < cmd.length; i++)
      this.emulator.console.input(cmd.charCodeAt(i));
    this.emulator.console.input(0x0a); // 0x0a is '\n'
    this._lastAccessTime = new Date();
  }

  setTimer(timer){
    this.timer = timer;
  }

  clearTimer(){
    clearTimeout(this.timer);
  }
}

export default SessionVM;

