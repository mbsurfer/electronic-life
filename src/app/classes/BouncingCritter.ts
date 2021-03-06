///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

declare var world;

class BouncingCritter extends Critter {

    private orientation:string;
    private energy:number;
    private wait:number;

    constructor() {
        super();
        this.energy = 20;
        this.orientation = this.direction;
        this.wait = 0;
    }

    public act(vector:Vector) {
        var view = new View(vector);
        if (view.look(this.direction) !== ' ') {
            this.direction = view.find(' ') || 's';
            this.turn();
        } else if (this.wait > 0) {
            this.wait--;
        } else {
            if (Math.random() > 0.9) {
                this.shoot(vector);
            } else {
                this.move(vector);
            }
        }
    }

    private turn() {
        this.orientation = this.direction;
    }

    private move(vector) {
        var dest = world.checkDestination(this.direction, vector);
        if (dest === null || this.energy <= 1 || world.grid.get(dest) != null) {
            return false;
        }
        //this.energy -= 1;
        world.grid.set(vector, null);
        world.grid.set(dest, this);
    }

    private shoot(vector) {
        var dest = world.checkDestination(this.direction, vector);
        if (dest === null || world.grid.get(dest) != null) {
            return false;
        }
        world.grid.set(dest, new Bullet(this.orientation));
        this.wait = 3;
    }

}