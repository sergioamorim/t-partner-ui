function actions_modal_controller($uibModalInstance, $scope, $filter, actions, moment, config) {
    $scope.actions = actions;
    $scope.config = config;
    $scope.getSubSessionTime = function (action) {
        var subSession = undefined;
        subSessionAPI.getSubSession(action.subSession).then(function(response) {
            subSession = response.data;
            return subSession.timeStart;
        });
    }
    $scope.getGreetingTime = function(m) {
        var t = moment(m);
        return t.format(config.format.date.summaryModal.access.weekDay)+' '+getGreetingTime(t)+', '+t.format(config.format.date.summaryModal.access.date);
    }
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
