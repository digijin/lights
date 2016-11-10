import Lights from './src/Lights';
import moment from 'moment'

let lights = new Lights()

let curr = lights.getStatus()
console.log("currently lights north/south are "+curr.ns+" and lights east/west are "+curr.ew);

let now = new Date();
let later = new Date();
later.setMinutes(later.getMinutes()+30);
let events = lights.getChanges(now, later);
events.sort((a,b) => {return a.time - b.time})
events.forEach(e => {
  let time = moment(e.time).format('LTS');
  console.log("at "+time+" "+e.light.toUpperCase()+" turns to "+e.to);
})
