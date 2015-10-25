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
                self.grid.set(new Vector(x, y), Util.elementFromChar(legend, line[x], self));
            }
        });
    }

    public turn() {
        var acted = [];
        this.grid.forEach(function(element, vector) {
            if (element.act && acted.indexOf(element) === -1) {
                acted.push(element);
                element.act(vector);
                console.log('acted');
            }
        }, this);
    }

    public checkDestination(direction:string, vector:Vector) {
        var destination = vector.plus(Util.getDirections[direction]);
        if (this.grid.isInside(destination)) {
            return destination;
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