
const GREEN = 'green'
const YELLOW = 'yellow'
const RED = 'red'

const TENMIN = 10*60*1000;
const FIVEMIN = 5*60*1000;
const THIRTYSEC = 30*1000;

export default class Lights{
  getStatus(time = new Date()) {
    time = time.getTime(); //make numeric
    let green = (time % FIVEMIN > FIVEMIN - THIRTYSEC) ? YELLOW:GREEN;
    if(time%TENMIN > FIVEMIN){
      return {ew:RED, ns:green}
    }else{
      return {ns:RED, ew:green}
    }
  }
  getChanges(start, end) {

  }
}
