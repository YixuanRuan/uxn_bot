import * as FS  from "fs"
import * as CP from "child_process"

class Linter{

  constructor(userID, data) {
    this._userID = userID;
    this._data = data;
  }

  lintFile(){
    let that = this;
    return new Promise((resolve, reject) => {
      that.saveFile();
      that.readFile();
      let out="";
      let err="";
      const cmd = CP.exec(`/app/uxn/bin/uxncli /app/uxn/bin/uxnlin.rom /app/${that._userID}.tal`);
      cmd.stdout.on('data', function(data) {
        out += data.toString()
      })
      cmd.stderr.on('data', function(data) {
        err += data.toString()
      })
      cmd.on('close', function() {
        resolve(out)
      })
      cmd.on('error', function(err) { reject(err) })
      setTimeout(()=>{
        that.deleteFile();
      }, 2000);
    })
  }

  saveFile(){
    FS.writeFile(`/app/${this._userID}.tal`,this._data,function(err){
      console.log(err);
    })
  }

  readFile(){
    FS.readFile(`/app/${this._userID}.tal`,'utf8',function(err,data){
      if(err){
        return console.log('Read File Fail！'+err.message)
      }
      console.log('Read File Success！:'+data);
      return data;
    })
  }

  deleteFile(){
    FS.unlinkSync(`/app/${this._userID}.tal`);
  }
}

export default Linter;