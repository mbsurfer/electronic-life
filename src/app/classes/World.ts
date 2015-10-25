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
        var acted = [];
        this.grid.forEach(function(element, vector) {
            if (element.act && acted.indexOf(element) === -1) {
                acted.push(element);
                element.act(vector);
            }
        }, this);
        return this.toArray();
    }

    public checkDestination(direction:string, vector:Vector) {
        var destination = vector.plus(Util.getDirection(direction));
        if (this.grid.isInside(destination)) {
            return destination;
        }
    }

    public toArray() {
        var output = [];
        for (var y = 0; y < this.grid.height; y++) {
            for (var x = 0; x < this.grid.width; x++) {
                var element = this.grid.get(new Vector(x, y));
                if (output[y] === undefined) {
                    output[y] = [];
                }
                output[y][x] = element;
            }
        }
        return output;
    }

    public getChar(element:any) {
        var type = element.constructor.name;
        var char = null;
        console.log(type);
        _.forEach(this.legend, function(val, i) {
           if (val === type) {
               char = i;
               return false;
           }
        });
        return char;
    }

}