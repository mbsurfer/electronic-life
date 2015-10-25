///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

class BouncingCritter {

    private direction:string;

    constructor(direction) {
        this.direction = direction;
    }

    public act(view:View) {
        if (view.look(this.direction) !== ' ') {
            this.direction = view.find(' ') || 's';
        }
        return {type: 'move', direction: this.direction};
    }

}