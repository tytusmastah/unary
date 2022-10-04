import * as supertest from 'supertest';
import { it } from 'mocha';
import { Unary } from '../unary';
import { expect } from 'chai';

describe("Unary number system test", ()=>{

    describe("Constructors", () =>{

        it("Zero", (done)=>{
            let u = new Unary(0);
            expect(u.intValue()).equal(0); 
            expect(u.toString() == "[0]:").is.true
            done();
        });

        it("Jeden", (done)=>{
            let u = new Unary(1); 
            expect(u.intValue() == 1).is.true;
            expect(u.toString() == "[1]: true").is.true;
            done();
        });

        it("Dziesięć", (done)=>{
            let u = new Unary(10);
            expect(u.intValue() == 10).is.true;
            expect(u.toString() == "[10]: true true true true true true true true true true").is.true; 
            done();
        });

        it("Unary", (done) =>{
            let u = new Unary(5);
            let nu = new Unary(u);
            expect(u.intValue()).equal(5);
            expect(nu.intValue()).equal(5);
            expect(nu.toString()).equal("[5]: true true true true true");
            done();
        });

        it("Array", (done)=>{
            let a : boolean[] = [true, true, true];
            let u = new Unary(undefined, a);
            expect(u.intValue()).equal(3);
            expect(u.toString()).equals("[3]: true true true");
            done();
        });

        it("Bad Array", (done)=>{
            let a : boolean[] = [true, false, true];
            let u = new Unary(undefined, a);
            expect(u.intValue() == undefined).is.true;
            expect(u.toString() == "NaN").is.true;
            done();
        });

        it("Bad number", (done)=>{
            let u = new Unary(-1);
            // console.log("----------")
            // console.log(u);
            // console.log(u.intValue());
            // console.log(u.toString());
            expect(u.intValue()).is.undefined; 
            expect(u.toString()).equal("NaN");
            done();
        })

    }); 

    describe("Dodawanie", ()=>{

        it ("0+1", (done)=>{
            let u = new Unary(0);
            let n = new Unary(1);
            let a = u.add(n);
            expect(a.intValue()).equal(1);
            done();
        });
        it ("1+0", (done)=>{
            let u = new Unary(1);
            let n = new Unary(0);
            let a = u.add(n);
            expect(a.intValue()).equal(1);
            done();
        });
        it ("1+1", (done)=>{
            let u = new Unary(1);
            let n = new Unary(1);
            let a = u.add(n);
            expect(a.intValue()).equal(2);
            done();
        });
        it ("3+7", (done)=>{
            let u = new Unary(3);
            let n = new Unary(7);
            let a = u.add(n);
            expect(a.intValue()).equal(10);
            done();
        });
        it ("nan+1", (done)=>{
            let u = new Unary();
            let n = new Unary(1);
            let a = u.add(n);
            expect(a.intValue()).is.undefined;
            done();
        });
        it ("2+nan", (done)=>{
            let u = new Unary(2);
            let n = new Unary();
            let a = u.add(n);
            expect(a.intValue()).is.undefined;
            done();
        });
        it ("nan+nan", (done)=>{
            let u = new Unary();
            let n = new Unary();
            let a = u.add(n);
            expect(a.intValue()).is.undefined;
            done();
        });

    });


    describe("Odejmowanie", ()=>{

        it ("0-1", (done)=>{
            let u = new Unary(0);
            let n = new Unary(1);
            let a = u.dec(n);
            expect(a.intValue()).equal(0);
            done();
        });
        it ("1-0", (done)=>{
            let u = new Unary(1);
            let n = new Unary(0);
            let a = u.dec(n);
            expect(a.intValue()).equal(1);
            done();
        });
        it ("1-1", (done)=>{
            let u = new Unary(1);
            let n = new Unary(1);
            let a = u.dec(n);
            expect(a.intValue()).equal(0);
            done();
        });
        it ("7+3", (done)=>{
            let u = new Unary(7);
            let n = new Unary(3);
            let a = u.dec(n);
            expect(a.intValue()).equal(4);
            done();
        });
        it ("nan-1", (done)=>{
            let u = new Unary();
            let n = new Unary(1);
            let a = u.dec(n);
            expect(a.intValue()).is.undefined;
            done();
        });
        it ("2-nan", (done)=>{
            let u = new Unary(2);
            let n = new Unary();
            let a = u.dec(n);
            expect(a.intValue()).is.undefined;
            done();
        });
        it ("nan-nan", (done)=>{
            let u = new Unary();
            let n = new Unary();
            let a = u.dec(n);
            expect(a.intValue()).is.undefined;
            done();
        });

    });

    describe("Mnożenie", ()=>{
        it("0*1", (done)=>{
            let u = new Unary(0);
            let n = new Unary(1);
            let a = u.mul(n);
            expect(a.intValue()).equal(0);
            done();
        });
        it("1*0", (done)=>{
            let u = new Unary(1);
            let n = new Unary(0);
            let a = u.mul(n);
            expect(a.intValue()).equal(0);
            done();
        });
        it("1*7", (done)=>{
            let u = new Unary(1);
            let n = new Unary(7);
            let a = u.mul(n);
            expect(a.intValue()).equal(7);
            done();
        });
        it("7*1", (done)=>{
            let u = new Unary(7);
            let n = new Unary(1);
            let a = u.mul(n);
            expect(a.intValue()).equal(7);
            done();
        });
        it("7*3", (done)=>{
            let u = new Unary(7);
            let n = new Unary(3);
            let a = u.mul(n);
            expect(a.intValue()).equal(21);
            done();
        });
        it("1000*1000", (done)=>{
            let u = new Unary(1000);
            let n = new Unary(1000);
            let a = u.mul(n);
            expect(a.intValue()).equal(1000000);
            done();
        });
        it("nan*7", (done)=>{
            let u = new Unary();
            let n = new Unary(7);
            let a = u.mul(n);
            expect(a.intValue()).is.undefined;
            done();
        });
        it("7*nan", (done)=>{
            let u = new Unary(7);
            let n = new Unary();
            let a = u.mul(n);
            expect(a.intValue()).is.undefined;
            done();
        });
        it("nan*nan", (done)=>{
            let u = new Unary();
            let n = new Unary();
            let a = u.mul(n);
            expect(a.intValue()).is.undefined;
            done();
        });
    });

    describe("Dzielenie", ()=>{
        it("5/1", (done)=>{
            let u = new Unary(5);
            let n = new Unary(1);
            let a = u.div(n);
            expect(a[0].intValue()).equal(5);
            expect(a[1].intValue()).equal(0);
            done();
        });
        it("1/5", (done)=>{
            let u = new Unary(1);
            let n = new Unary(5);
            let a = u.div(n);
            expect(a[0].intValue()).equal(0);
            expect(a[1].intValue()).equal(1);
            done();
        });
        it("0/5", (done)=>{
            let u = new Unary(0);
            let n = new Unary(5);
            let a = u.div(n);
            expect(a[0].intValue()).equal(0);
            expect(a[1].intValue()).equal(0);
            done();
        });

        it("4/2", (done)=>{
            let u = new Unary(4);
            let n = new Unary(2);
            let a = u.div(n);
            expect(a[0].intValue()).equal(2);
            expect(a[1].intValue()).equal(0);
            done();
        });
        it("21/7", (done)=>{
            let u = new Unary(21);
            let n = new Unary(7);
            let a = u.div(n);
            expect(a[0].intValue()).equal(3);
            expect(a[1].intValue()).equal(0);
            done();
        });
        it("21/4", (done)=>{
            let u = new Unary(21);
            let n = new Unary(4);
            let a = u.div(n);
            expect(a[0].intValue()).equal(5);
            expect(a[1].intValue()).equal(1);
            done();
        });
        it("1000000/99", (done)=>{
            let u = new Unary(1000000);
            let n = new Unary(99);
            let a = u.div(n);
            expect(a[0].intValue()).equal(10101);
            expect(a[1].intValue()).equal(1);
            done();
        });
        it("5/0", (done)=>{
            let u = new Unary(5);
            let n = new Unary(0);
            let a = u.div(n);
            expect(a[0].intValue()).is.undefined;
            expect(a.length).equals(1);
            done();
        });
        it("nan/2", (done)=>{
            let u = new Unary();
            let n = new Unary(2);
            let a = u.div(n);
            expect(a[0].intValue()).is.undefined;
            expect(a.length).equals(1);
            done();
        });
        it("2/nan", (done)=>{
            let u = new Unary(2);
            let n = new Unary();
            let a = u.div(n);
            expect(a[0].intValue()).is.undefined;
            expect(a.length).equals(1);
            done();
        });
        it("nan/nan", (done)=>{
            let u = new Unary();
            let n = new Unary();
            let a = u.div(n);
            expect(a[0].intValue()).is.undefined;
            expect(a.length).equals(1);
            done();
        });
    });


});
