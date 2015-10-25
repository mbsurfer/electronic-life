///<reference path="../../typings/tsd.d.ts" />
///<reference path="../../typings/typescriptApp.d.ts" />

module Elife {

    (():void => {

        angular
            .module('elife', [
                'ui.bootstrap',
                'ui.router',
                'oc.lazyLoad',
                'restangular',
                'angular-storage'
            ])
            .run(function ($rootScope, $state, $stateParams) {

                $rootScope.$state = $state;

                $rootScope.$stateParams = $stateParams;

                $rootScope.$on('$stateChangeError', function (e) {
                    alert(e);
                });

            })
            .config(['$stateProvider', function ($stateProvider) {
                $stateProvider
                    .state('app', {
                        abstract: true
                    });
            }]);
    })();

}