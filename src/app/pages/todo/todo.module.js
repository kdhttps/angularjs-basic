/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.todo', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('todo', {
                url: '/todo',
                templateUrl: 'app/pages/todo/todo.details.html',
                title: 'Todo',
                controller: 'TodoController',
                controllerAs: '$ctrl',
                sidebarMeta: {
                    icon: 'ion-android-cart',
                    order: 250
                }
            });
    }
})();
