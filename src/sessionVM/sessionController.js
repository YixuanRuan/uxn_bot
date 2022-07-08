import SessionVM from "./sessionVM.js";

class SessionController{
  constructor() {
    this.vmList = [];
  }

  runCmdOnVM(userID, botID, cmd){
    let sessionVM =  this.findOrAddSessionVM(userID, botID);
    sessionVM.clearTimer();
    sessionVM.inputNewCommand(cmd.trim());
    sessionVM.lastAccessTime = new Date();
    let timer = setTimeout(()=>{this.setToBeRemovedSessionVM(sessionVM)},1000*60*10);
    sessionVM.setTimer(timer);
    console.log(sessionVM);
    console.log(userID);
    console.log(botID);
    console.log(cmd);
    return sessionVM.resultBuffer;
  }

  setToBeRemovedSessionVM(vm){
    const toBeRemovedIndex = this.vmList.indexOf(vm);
    if(toBeRemovedIndex !== -1){
      this.vmList.splice(toBeRemovedIndex, 1);
    }
  }

  findOrAddSessionVM(userID, botID) {
    let oldSessionVM = this.vmList.find(function (sessionVM) {
      return (sessionVM.userID === userID) && (sessionVM.botID === botID);
    });
    if(oldSessionVM === undefined){
      let newSessionVM = new SessionVM(userID, botID);
      console.log("new vm");
      this.vmList.push(newSessionVM);
      return newSessionVM
    }
    console.log("old vm");
    return oldSessionVM
  }
}

export default SessionController;
