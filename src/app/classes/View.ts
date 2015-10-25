///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

class View {

    private world:World;
    private vector:Vector;

    constructor(world, vector) {
        this.world = world;
        this.vector = vector;
    }

    public look(dir:string) {
        var target = this.vector.plus(Util.getDirections[dir]);
        if (this.world.grid.isInside(target)) {
            return Util.charFromElement(this.world.grid.get(target));
        } else {
            return '#';
        }
    }

    public findAll(ch:string) {
        var found = [];
        for (var dir in Util.getDirections) {
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