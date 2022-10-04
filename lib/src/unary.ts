


export class Unary {

    private value: boolean[] = [];
    private nan: boolean = false;

    constructor(n?: number | Unary, arr?: boolean[]) {
        // console.log(n);
        if (n!=undefined) {
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
        if (this.intValue()==undefined || n.intValue()==undefined) {
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
        if (this.intValue()==undefined || n.intValue()==undefined) {
            return new Unary();
        }
        const ret: boolean[] = [];
        for (var i = n.length(); i < this.length(); i++) {
            ret.push(true);
        }
        return new Unary(undefined, ret);
    }

    mul(n: Unary): Unary {
        if (this.intValue()==undefined || n.intValue()==undefined) {
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
        if (this.intValue()==undefined || n.intValue()==undefined) {
            return [new Unary()];
        }
        if (n.intValue() == 0){
            return [new Unary()];
        }
        const ret: boolean[] = [];
        var mant: boolean[] = [];
        var i = 0;
        while (i < this.length()) {
            var j = 0;
            // console.log(`1 i: ${i}, j:${j}, ret:${ret}, mant:${mant}`)
            while (j < n.length()) {
                if (i>=this.length()){
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

}