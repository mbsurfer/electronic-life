///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

class Vector {

    public x:number;
    public y:number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    public plus(other:Vector) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

}