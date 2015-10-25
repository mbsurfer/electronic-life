///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

class Critter {

    protected direction:string;

    constructor() {
        this.direction = Util.randomDirection();
    }

    public act(vector:Vector) {
        //
    }

}