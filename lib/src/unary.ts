


export class Unary {

    private value: boolean[] = [];
    private nan: boolean = false;

    constructor(n?: number | Unary, arr?: boolean[]) {
        // console.log(n);
        if (n != undefined) {
            // console.log("1: " + n);
            let count;
            if (n instanceof Unary) {
                count = n.intValue();
            } else {
                count = n;
            }
            // console.log("2: " + n);

            if (count == undefined) {
                this.nan = true;
                // console.log("3: " + this);
            } else {
                if (count < 0) {
                    this.nan = true;
                    // console.log("4: " + this);
                } else {
                    for (var i = 0; i < count; i++) {
                        this.value.push(true);
                    }
                    // console.log("5: " + this);
                }
            }

        } else if (arr) {
            // console.log("6: " + arr);
            for (var i = 0; i < arr.length; i++) {
                if (!arr[i]) {
                    this.nan = true;
                    // console.log("7: " + this);
                }
                this.value.push(arr[i]);
            }
        } else {
            this.nan = true;
            // console.log("8: " + this);
        }
    }

    add(n: Unary): Unary {
        if (this.intValue() == undefined || n.intValue() == undefined) {
            return new Unary();
        }
        // const ret = new Unary(this.intValue()+n.intValue());
        const ret: boolean[] = [];
        for (var i = 0; i < this.length(); i++) {
            ret.push(true);
        }
        for (var i = 0; i < n.length(); i++) {
            ret.push(true);
        }
        return new Unary(undefined, ret);
    }

    dec(n: Unary): Unary {
        if (this.intValue() == undefined || n.intValue() == undefined) {
            return new Unary();
        }
        const ret: boolean[] = [];
        for (var i = n.length(); i < this.length(); i++) {
            ret.push(true);
        }
        return new Unary(undefined, ret);
    }

    mul(n: Unary): Unary {
        if (this.intValue() == undefined || n.intValue() == undefined) {
            return new Unary();
        }
        const ret: boolean[] = [];
        for (var i = 0; i < this.length(); i++) {
            for (var j = 0; j < n.length(); j++) {
                ret.push(true);
            }
        }
        return new Unary(undefined, ret);
    }

    div(n: Unary): Unary[] {
        if (this.intValue() == undefined || n.intValue() == undefined) {
            return [new Unary()];
        }
        if (n.intValue() == 0) {
            return [new Unary()];
        }
        const ret: boolean[] = [];
        var mant: boolean[] = [];
        var i = 0;
        while (i < this.length()) {
            var j = 0;
            // console.log(`1 i: ${i}, j:${j}, ret:${ret}, mant:${mant}`)
            while (j < n.length()) {
                if (i >= this.length()) {
                    return [new Unary(undefined, ret), new Unary(undefined, mant)];
                }
                mant.push(true);
                j++;
                i++;
                // console.log(`2 i: ${i}, j:${j}, ret:${ret}, mant:${mant}`)
            }
            if (i <= this.length()) {
                ret.push(true);
                mant = [];
                // console.log(`3 i: ${i}, j:${j}, ret:${ret}, mant:${mant}`)
            } else {
                // console.log(`4 i: ${i}, j:${j}, ret:${ret}, mant:${mant}`)
                return [new Unary()];
            }
        }
        // console.log(`5 ret:${ret}, mant:${mant}`)
        return [new Unary(undefined, ret), new Unary(undefined, mant)];
    }

    lt(n: Unary): boolean {
        let i = 0;
        while (i < this.length()) {
            if (i >= n.length() - 1) {
                return false;
            }
            i++;
        }
        return true;
    }

    gt(n: Unary): boolean {
        return n.lt(this);
    }

    eq(n: Unary): boolean {
        return !(this.gt(n) || this.lt(n));
    }

    public intValue(): number | undefined {
        if (this.nan) {
            return undefined;
        }
        return this.value.length;
    }

    length(): number {
        return this.value.length;
    }

    line(): string {
        if (this.length() > 10) {
            return " too big to display"
        }
        let l = "";
        this.value.forEach(e => l += " true");
        return l;
    }

    toString(): string {
        if (this.nan) {
            return "NaN";
        }
        return `[${this.intValue()}]:${this.line()}`;
    }

    fibo(): Unary[] {
        this.overflow(this, 39);
        let c = this.intValue();
        c = c ? c : 0;

        let one = new Unary(1);
        let two = new Unary(1);
        let fibo: Unary[] = [one, two];
        let counter = 3;
        while (counter <= c) {
            let sum = one.add(two);
            one = two;
            two = sum;
            fibo.push(sum);
            counter++;
        }
        return fibo;
    }

    overflow(u: Unary, n: number) {
        if (u.length() > n) {
            console.error("Overflow: " + u.length() + " vs " + n);
            throw { overflow: u.length() };
        }
    }


    power(u: Unary): Unary {
        if (this.nan) {
            return new Unary();
        }
        if (u.nan) {
            return new Unary();
        }
        let result = new Unary(1);
        for (var i = 0; i < u.length(); i++) {
            result = result.mul(this);
        }
        return result;
    }

    inc() {
        this.value.push(true);
    }

    dotty(): string {
        let ret = "#".repeat(this.length());
        return ret;
    }

    display(i: number, l: number, s: Unary, t: Unary[]): string {
        console.log(`status: index: ${i}, line: ${l}, current sqrt: ${s.length()}, temp table depth: ${t.length}`);
        let res = "-----\n";
        for (let i = 0; i <= l || i <= s.length() || i < t.length; i++) {
            res += (i === l ? "l" : " ");
            res += (i === s.length() ? "s" : " ");
            res += " |"
            if (i < t.length) {
                res += t[i].dotty();
            }
            res += "\n";
        }
        res += "-----"
        return res;
    }

    sqrt(): Unary {
        if (this.nan) {
            return new Unary();
        }
        let temp: Unary[] = [];
        let sqr = new Unary(0);
        // console.log("SQRT of " + this.intValue());
        let line = 0;
        // console.log("Długość: " + this.length());
        for (var i = 0; i < this.length(); i++) {
            if (temp.length == 0) {
                // console.log("Initialization");
                temp.push(new Unary(1));
                sqr.inc();
                line++;
            } else {
                if (line >= temp.length) {
                    // console.log("Increase temp table, bo line > temp.length");
                    temp.push(new Unary(1));
                } else {
                    if (line == sqr.length()
                        && temp[line].length() >= sqr.length()) {
                        // console.log("line = 0, bo line == sqrt i linia wypełniona do sqrt")
                        line = 0;
                    }

                    temp[line].inc();

                    if (temp[line].length() == sqr.length()) {
                        // console.log("następna linia, bo ta jest wypełniona do sqrt")
                        line++;
                        if (line > sqr.length()){
                            // console.log("Ale jednak 0, bo się zapędziliśmy")
                            line = 0
                        }
                        // temp.push(new Unary(1));
                        // line = 0; 
                    }
                    else if (temp[line].length() > sqr.length()) {
                        // console.log("increase sqrt bo wypełnilismy linię bardziej niż sqrt")
                        sqr.inc();
                        line++;
                    }
                }
            }
            // console.log("==> " + this.display(i, line, sqr, temp));
        }
    //    console.log("Wyliczono: ", this.display(i, line, sqr, temp));
    //     console.log("return", sqr.intValue());
        return sqr;
    }



}