function actions_modal_controller($uibModalInstance, $scope, actions) {
    $scope.actions = actions;
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
