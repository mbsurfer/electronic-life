///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

declare var world;

class Moblin extends Critter {

    private orientation:string;
    private energy:number;

    constructor() {
        super();
        this.energy = 20;
        this.orientation = this.direction;
    }

    public act(vector:Vector) {
        var view = new View(vector);
        if (view.look(this.direction) !== ' ') {
            this.direction = view.find(' ') || 's';
            this.turn();
        } else {
            this.move(vector);
        }
    }

    private turn() {
        this.orientation = this.direction;
    }

    private move(vector) {
        var dest = world.checkDestination(this.direction, vector);
        if (dest == null || this.energy <= 1 || world.grid.get(dest) != null) {
            return false;
        }
        //this.energy -= 1;
        world.grid.set(vector, null);
        world.grid.set(dest, this);
        return true;
    }

}