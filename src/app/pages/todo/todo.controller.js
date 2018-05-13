(function () {
    'use strict';

    angular.module('BlurAdmin.pages.todo')
        .controller('TodoController', TodoController);

    /** @ngInject */
    function TodoController(todoService, toastr, $uibModal) {
        var vm = this;
        vm.smartTablePageSize = 10;
        vm.callServer = callServer;
        vm.openTodoManage = openTodoManage;
        vm.removeTodo = removeTodo;

        //definitions
        function callServer(tableState) {
            todoService.getAllTodoDeep(tableState).then(onSuccess).catch(onError);

            function onSuccess(response) {
                vm.smartTableData = response.data.data;
                tableState.pagination.numberOfPages = response.data.numberOfPages;
            }

            function onError(error) {
                toastr.error('Failed to Fetch data ', 'Todos', {});
            }
        }

        function openTodoManage(todo) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/todo/todo.manage.html',
                size: 'md',
                controller: 'TodoManageController',
                controllerAs: '$ctrl',
                resolve: {
                    vTodo: function () {
                        return todo;
                    }
                }
            }).result.then(function (todo) {
                var index = _.findIndex(vm.smartTableData, {_id: todo._id});
                if (index >= 0) {
                    vm.smartTableData[index] = todo;
                } else {
                    vm.smartTableData.push(todo);
                }
            });
        }

        function removeTodo(id) {
            if (!confirm('Are you sure you want to remove this todo?')) {
                return null;
            }

            todoService.removeTodo(id).then(onSuccess).catch(onError);

            function onSuccess(response) {
                _.remove(vm.smartTableData, {_id: id});
                toastr.success('Deleted Successful', 'Todo', {});
            }

            function onError(error) {
                toastr.error('Failed to delete todo', 'Todo', {});
            }
        }
    }
})();
