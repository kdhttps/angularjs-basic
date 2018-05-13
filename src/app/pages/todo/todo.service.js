(function () {
    'use strict';

    angular.module('BlurAdmin.pages.todo')
        .factory('todoService', todoService);

    /** @ngInject */
    function todoService($http, urls) {
        var service = {
            getAllTodoDeep: getAllTodoDeep,
            getAllTodo: getAllTodo,
            removeTodo: removeTodo,
            updateTodo: updateTodo,
            createTodo: createTodo
        };

        function getAllTodoDeep(search) {
            return $http.post(urls.BASE_URL + '/api/todo/search', search);
        }

        function getAllTodo() {
            return $http.get(urls.BASE_URL + '/api/todo');
        }

        function removeTodo(id) {
            return $http.delete(urls.BASE_URL + '/api/todo/' + id);
        }

        function updateTodo(formData, id) {
            return $http.put(urls.BASE_URL + '/api/todo/' + id, formData);
        }

        function createTodo(formData) {
            return $http.post(urls.BASE_URL + '/api/todo', formData);
        }

        return service;
    }
})();
