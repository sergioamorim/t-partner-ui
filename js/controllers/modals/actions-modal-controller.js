function actions_modal_controller($uibModalInstance, $scope, $filter, accesses, moment, config) {
    $scope.config = config;
    $scope.accesses = accesses;
    $scope.getGreetingTime = function(m) {
        var t = moment(m);
        return t.format(config.format.date.summaryModal.access.weekDay)+' '+getGreetingTime(t)+', '+t.format(config.format.date.summaryModal.access.date);
    };
    $scope.getTimeSpent = function(action) {
        if (action.problemResponseTime > 0) {
            return $filter('milliSecondsToTimeString')(action.problemResponseTime);
        } else if (action.contentViewTime > 0) {
            return $filter('milliSecondsToTimeString')(action.contentViewTime);
        } else {
            return '';
        }
    };
    $scope.getResource = function(action) {
        if (action.problemId != '*') {
            return action.problemId.replace('MultipleChoiceProblem_','');
        } else if (action.contentId != '*') {
            return action.contentId.replace('Content_','');
        } else {
            return '';
        }
    };
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
