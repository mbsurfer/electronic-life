///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

declare var world;

class View {

    private vector:Vector;

    constructor(vector) {
        this.vector = vector;
    }

    public look(dir:string) {
        var target = this.vector.plus(Util.getDirection(dir));
        if (world.grid.isInside(target)) {
            return Util.charFromElement(world.grid.get(target));
        } else {
            return '#';
        }
    }

    public findAll(ch:string) {
        var found = [];
        for (var dir in Util.getDirections()) {
            if (this.look(dir) === ch) {
                found.push(dir);
            }
        }
        return found;
    }

    public find(ch:string) {
        var found = this.findAll(ch);
        if (found.length === 0) {
            return null;
        }
        return Util.randomElement(found);
    }
}