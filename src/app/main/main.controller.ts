///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

//global world
var world;

module Elife {

    declare var _; //lodash

    class MainController {

        public world:World;

        public displayWorld:any;

        public isPlaying:boolean;

        public static $inject = [
            '$scope',
            '$rootScope'
        ];

        constructor(private $scope,
                    private $rootScope
        ) {
            var main = this;

            this.buildWorld();

            this.isPlaying = false;
        }

        private buildWorld() {

            var plan =
               ['############################',
                '#      #    #      o      ##',
                '#                      pppp#',
                '#          #####        ppp#',
                '##ppp      #   #    ##  ppp#',
                '###ppp        ##     #   pp#',
                '#           ###      #    p#',
                '#   ####                   #',
                '#   ## pp    o             #',
                '# o  #pppp     o       ### #',
                '#    #pppp                 #',
                '############################'];

            this.world = world = new World(plan, {
                '#': Wall,
                'o': BouncingCritter,
                'p': Plant
            });

            this.displayWorld = this.world.toArray();

        }

        public togglePlay() {
            this.isPlaying = !this.isPlaying;

            if (this.isPlaying) {
                this.world.turn();
            }
        }
    }

    angular.module('elife')
        .controller('MainController', MainController)
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.main', {
                    url: '/app',
                    controller: 'MainController',
                    controllerAs: 'main',
                    templateUrl: 'app/main/main.tmpl.html'
                });
        }]);

}