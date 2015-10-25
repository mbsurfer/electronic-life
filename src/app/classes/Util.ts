///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

declare var _; //lodas

class Util {

    static directionNames = [
        'n',
        'e',
        's',
        'w'
    ];

    static getDirections() {
        return {
            'n' :   new Vector( 0, -1),
            //'ne':   new Vector( 1, -1),
            'e' :   new Vector( 1,  0),
            //'se':   new Vector( 1,  1),
            's' :   new Vector( 0,  1),
            //'sw':   new Vector(-1,  1),
            'w' :   new Vector(-1,  0)
            //'nw':   new Vector(-1, -1)
        };
    }

    static getDirection(dir) {
        return Util.getDirections()[dir];
    }

    static randomElement(array:any[]) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static randomDirection() {
        return Util.randomElement(Util.directionNames);
    }

    static elementFromChar(legend:any, ch:string) {
        if (ch === ' ') {
            return null;
        }
        var element = new legend[ch]();
        element.originChar = ch;
        return element;
    }

    static charFromElement(element:any) {
        if (element == null) {
            return ' ';
        } else {
            return element.originChar;
        }
    }

    static dirPlus(dir:string, n:number) {
        var index = this.directionNames.indexOf(dir);
        return this.directionNames[(index + n + 8) % 8];
    }
}