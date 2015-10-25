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

        public turnCount:number = 0;

        public static $inject = [
            '$scope',
            '$rootScope',
            '$timeout',
            '$interval'
        ];

        constructor(private $scope,
                    private $rootScope,
                    private $timeout,
                    private $interval
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

        public stepPlay() {
            this.displayWorld = this.world.turn();
            this.turnCount++;
        }

        public togglePlay() {
            var self = this;
            this.isPlaying = !this.isPlaying;

            var playTimer = this.$interval(function(){
                if (!self.isPlaying) {
                    self.$interval.cancel(playTimer);
                } else {
                    self.displayWorld = self.world.turn();
                    self.turnCount++;
                }
            }, 100);
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