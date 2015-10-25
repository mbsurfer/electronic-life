///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

//global world
var world;

module Elife {

    declare var _; //lodash

    class EditController {

        public rowCount:number
        public colCount:number;

        public world:any;
        public displayWorld:any;

        public static $inject = [
            '$scope',
            '$rootScope',
            '$timeout'
        ];

        constructor(private $scope,
                    private $rootScope,
                    private $timeout
        ) {
            var edit = this;

            this.rowCount = 10;
            this.colCount = 10;

            this.buildWorld();
        }

        public buildWorld() {
            var plan = [];
            for (var x = 0; x < this.rowCount; x++) {
                plan[x] = [];
                for (var y = 0; y < this.colCount; y++) {
                    plan[x] += ' ';
                }
            }

            this.world = world = new World(plan, {
                '#': Wall,
                'o': BouncingCritter,
                'p': Plant,
                'w': Water,
                'm': Moblin
            });

            this.displayWorld = this.world.toArray();
        }

        public setCell(x, y) {

            this.world.grid.set(new Vector(x, y), 'w');

            this.displayWorld = this.world.toArray();

        }
    }

    angular.module('elife')
        .controller('EditController', EditController)
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.edit', {
                    url: '/edit',
                    controller: 'EditController',
                    controllerAs: 'edit',
                    templateUrl: 'app/edit/edit.tmpl.html'
                });
        }]);

}