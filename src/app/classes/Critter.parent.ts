///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

class Critter {

    protected direction:string;

    constructor(direction?) {
        if (direction === undefined) {
            this.direction = Util.randomDirection();
        } else {
            this.direction = direction;
        }

    }

    public act(vector:Vector) {
        //
    }

}