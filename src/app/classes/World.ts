///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

declare var _; //lodash

class World {

    private legend:any;

    public grid:Grid;

    constructor(map:string[], legend:any) {

        var self = this;
        this.grid = new Grid(map[0].length, map.length);
        this.legend = legend;

        map.forEach(function(line:string, y:number) {
            for (var x = 0; x < line.length; x++) {
                self.grid.set(new Vector(x, y), Util.elementFromChar(legend, line[x]));
            }
        });
    }

    public turn() {
        var self = this;
        var acted = [];
        this.grid.forEach(function(critter, vector) {
            if (critter.act && acted.indexOf(critter) === -1) {
                acted.push(critter);
                self.letAct(critter, vector);
            }
        }, this);
    }

    public letAct(critter:any, vector:Vector) {
        var action = critter.act(new View(this, vector));
        if (action && action.type === 'move') {
            var dest = this.checkDestination(action, vector);
            if (dest && this.grid.get(dest) == null) {
                this.grid.set(vector, null);
                this.grid.set(dest, critter);
            }
        }
    }

    public checkDestination(action:any, vector:Vector) {
        if (Util.getDirections.hasOwnProperty(action.direction)) {
            var destination = vector.plus(Util.getDirections[action.direction]);
            if (this.grid.isInside(destination)) {
                return destination;
            }
        }
    }

    public toArray() {
        var output = [];
        for (var y = 0; y < this.grid.height; y++) {
            for (var x = 0; x < this.grid.width; x++) {
                var element = this.grid.get(new Vector(x, y));
                if (output[x] === undefined) {
                    output[x] = [];
                }
                output[y][x] = Util.charFromElement(element);
            }
        }
        return output;
    }

}