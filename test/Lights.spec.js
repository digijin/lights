import Lights from '../src/Lights';
import {expect} from 'chai';


let lights = new Lights();

describe('Lights', () => {
  describe('getStatus', () => {
    it('should be a function', () => {
      expect(lights.getStatus).to.be.a('function');
    });
    it('should return an object', () => {
      let time = new Date();
      expect(lights.getStatus(time)).to.be.an('object')
    })
    it('should have NS and EW', () => {
      let time = new Date();
      let out = lights.getStatus(time);
      expect(out).to.have.property('ns')
      expect(out).to.have.property('ew')
    });
    describe('NS', () => {
      it('should be red for the first 5 minutes', () => {
        let time = new Date();
        time.setMinutes(2);
        expect(lights.getStatus(time).ns).to.equal('red')
      })
      it('should be green between 5 and 9 minutes', () => {
        let time = new Date()
        time.setMinutes(7);
        expect(lights.getStatus(time).ns).to.equal('green')
      });
      it('should be yellow from 9:30 to 10', () => {
        let time = new Date()
        time.setMinutes(9);
        time.setSeconds(45);
        expect(lights.getStatus(time).ns).to.equal('yellow')
      })
    })
    describe('EW', () => {
      it('should be green for the first 4.5 minutes', () => {
        let time = new Date();
        time.setMinutes(2);
        expect(lights.getStatus(time).ew).to.equal('green')
      })
      it('should be yellow between 4.5 and 5 minutes', () => {
        let time = new Date()
        time.setMinutes(4);
        time.setSeconds(45);
        expect(lights.getStatus(time).ew).to.equal('yellow')
      });
      it('should be red from 5 to 10 mins', () => {
        let time = new Date()
        time.setMinutes(7);
        expect(lights.getStatus(time).ew).to.equal('red')
      })
    })
  });
  describe('getChanges', () => {
    it('should return an array of objects', () => {
      let start = new Date();
      let end = new Date();
      let out = lights.getChanges(start, end);
      expect(out).to.be.an('array');
    });
    it('should capture changing from green to yellow', () => {
      let start = new Date()
      let end = new Date();
      start.setMinutes(4);
      start.setMinutes(0);
      end.setMinutes(4);
      end.setSeconds(45);

      let out = lights.getChanges(start, end);
      expect(out.length).to.equal(1)
      expect(out[0].light).to.equal('ew');
      expect(out[0].from).to.equal('green');
      expect(out[0].to).to.equal('yellow');
    });
    it('should capture yellow to red', () => {

        let start = new Date()
        let end = new Date();
        start.setMinutes(4);
        start.setSeconds(45);
        end.setMinutes(6);
        let out = lights.getChanges(start,end);
        let ew = out[0];
        if(ew.light!=='ew') ew = out[1];
        expect(ew.from).to.equal('yellow')
        expect(ew.to).to.equal('red')
    });

  });
});
