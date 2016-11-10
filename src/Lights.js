
const GREEN = 'green'
const YELLOW = 'yellow'
const RED = 'red'

const TENMIN = 10*60*1000;
const FIVEMIN = 5*60*1000;
const THIRTYSEC = 30*1000;

let to = {};
to[RED] = YELLOW;
to[YELLOW] = GREEN;
to[GREEN] = RED;

export default class Lights{
  getStatus(time = new Date()) {
    time = time.getTime(); //make numeric
    let green = (time % FIVEMIN >= FIVEMIN - THIRTYSEC) ? YELLOW:GREEN;
    if(time%TENMIN >= FIVEMIN){
      return {ew:RED, ns:green}
    }else{
      return {ns:RED, ew:green}
    }
  }
  getChanges(start, end) {

    let time
    let status
    let output = []
    //find number of red/green phases
    let startPhase = Math.floor(start.getTime()/FIVEMIN)
    let endPhase = Math.floor(end.getTime()/FIVEMIN)

    let phases = endPhase - startPhase;
    for(let phase = 1; phase <= phases; phase++){
      time = new Date((startPhase+phase)*FIVEMIN);
      status = this.getStatus(time)
      output.push({light: 'ew', to:status.ew, from: to[status.ew], time: time});
      output.push({light: 'ns', to:status.ns, from: to[status.ns], time: time});
    }

    //yellow phases copypasta
    startPhase = Math.floor((start.getTime()+THIRTYSEC)/FIVEMIN);
    endPhase = Math.floor((end.getTime()+THIRTYSEC)/FIVEMIN);
    phases = endPhase - startPhase;
    for(let phase = 1; phase <= phases; phase++){
      time = new Date(((startPhase+phase)*FIVEMIN)-THIRTYSEC);
      status = this.getStatus(time)
      // more copypastaey
      if(status.ns === YELLOW)
        output.push({light: 'ns', to:YELLOW, from:GREEN , time: time});
      if(status.ew === YELLOW)
        output.push({light: 'ew', to:YELLOW, from:GREEN , time: time});
      //like this to avoid potential error
    }


    return output;
  }
}
