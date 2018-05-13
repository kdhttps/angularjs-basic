(function () {
  'use strict';

  angular.module('BlurAdmin.pages.todo')
    .controller('TodoManageController', TodoManageController);

  /** @ngInject */
  function TodoManageController($uibModalInstance, vTodo, toastr, todoService) {
    var vm = this;
    vm.todo = angular.copy(vTodo) || {};
    vm.manageTodo = manageTodo;

    function manageTodo(isFormValid) {
      if (!isFormValid) {
        return false;
      }

      if (vm.todo._id) {
          todoService.updateTodo(vm.todo, vm.todo._id).then(onSuccess).catch(onError);
      } else {
          todoService.createTodo(vm.todo).then(onSuccess).catch(onError);
      }

      function onSuccess(response) {
        if (response.data.name) {
          $uibModalInstance.close(response.data);
        }
        toastr.success('Todo created successfully', 'Todo', {});
      }

      function onError(error) {
        toastr.error('Failed to create Todo', 'Todo', {})
      }
    }
  }
})();
