///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

declare var world;

class BouncingCritter extends Critter {

    private orientation:string;
    private energy:number;

    constructor() {
        this.energy = 20;
    }

    public act(vector:Vector) {

        var view = new View(world, vector);

        if (view.look(this.direction) !== ' ') {
            this.direction = view.find(' ') || 's';
            this.turn();
        }

        console.log(this.direction);
        console.log(vector);

        this.move(vector);
    }

    private turn() {
        this.orientation = this.direction;
    }

    private move(vector) {
        console.log('move');
        var dest = world.checkDestination(this.direction, vector);
        if (dest == null || this.energy <= 1 || world.grid.get(dest) != null) {
            return false;
        }
        this.energy -= 1;
        world.grid.set(vector, null);
        world.grid.set(dest, Util.charFromElement(this));
        return true;
    }

}