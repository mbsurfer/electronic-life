///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/typescriptApp.d.ts" />

//global world
var world;

module Elife {

    declare var _; //lodash

    class MainController {

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


        }
    }

    angular.module('elife')
        .controller('MainController', MainController)
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.main', {
                    abstract: true,
                    controller: 'MainController',
                    controllerAs: 'main'
                });
        }]);

}