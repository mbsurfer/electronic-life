///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

//global world
var world;

module Elife {

    declare var _; //lodash

    class PlayController {

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
            var play = this;

            this.buildWorld();

            this.isPlaying = false;
        }

        private buildWorld() {

            var plan = [
                    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
                    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
                    'ww############################ww',
                    'ww#      #    #      o      ##ww',
                    'ww#   m                  pppp#ww',
                    'ww#          #####        ppp#ww',
                    'ww##ppp      #www#    ##  ppp#ww',
                    'ww###ppp     www##     #   pp#ww',
                    'ww#          w###      #    p#ww',
                    'ww#   ####              m    #ww',
                    'ww#   ## pp    o             #ww',
                    'ww# o  #pppp     o       ### #ww',
                    'ww#    #pppp                 #ww',
                    'ww############################ww',
                    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
                    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'];

            this.world = world = new World(plan, {
                '#': Wall,
                'o': BouncingCritter,
                'p': Plant,
                'w': Water,
                'm': Moblin
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
            }, 200);
        }
    }

    angular.module('elife')
        .controller('PlayController', PlayController)
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.play', {
                    url: '/play',
                    controller: 'PlayController',
                    controllerAs: 'play',
                    templateUrl: 'app/play/play.tmpl.html'
                });
        }]);

}