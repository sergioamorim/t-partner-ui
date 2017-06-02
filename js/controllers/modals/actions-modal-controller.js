function actions_modal_controller($uibModalInstance, $scope, $filter, actions, moment, config) {
    $scope.config = config;

    $scope.getTimeSpent = function(action) {
        if (action.problemResponseTime > 0) {
            return action.problemResponseTime;
        } else if (action.contentViewTime > 0) {
            return action.contentViewTime;
        } else {
            return 0;
        }
    };

    $scope.accesses = {
        data: [],
        make: function(actions){
            if (actions.length > 0){
                var access = {
                    timeStart: actions[0].subSession.timeStart,
                    capsules: []
                };
                $scope.accesses.inflateAccess(access, actions);
                $scope.accesses.data.push(access);
                $scope.accesses.make(actions);
            }
        },
        inflateAccess: function(access, actions) {
            if (actions.length > 0 && (access.capsules.length == 0 || access.capsules[access.capsules.length-1].actions[0].subSession.id == actions[0].subSession.id)) {
                var capsule = {
                    type: undefined,
                    timeStart: undefined,
                    timeEnd: undefined,
                    timeSpent: moment.duration(0),
                    actions: []
                }
                $scope.accesses.inflateCapsule(capsule, actions);
                $scope.accesses.inflateAccess(access, actions);
            }
        },
        inflateCapsule: function(capsule, actions) {
            if (actions.length > 0 && (capsule.actions.length == 0 || capsule.actions[capsule.actions.length-1].type == actions[0].type)) {
                if (capsule.actions.length == 0) {
                    var timeSpentDuration = moment.duration($scope.getTimeSpent(actions[0]));
                    capsule.timeStart = moment(actions[0].time).subtract(timeSpentDuration);
                    capsule.type = actions[0].type;
                }
                if (actions.length == 1) {
                    capsule.timeEnd = actions[0].time;
                }
                capsule.timeSpent.add($scope.getTimeSpent(actions[0]));
                capsule.actions.push(actions[0]);
                actions.shift();
                $scope.accesses.inflateCapsule(capsule, actions);
            }
        }
    };
    $scope.accesses.make(actions);

    $scope.getGreetingTime = function(m) {
        var t = moment(m);
        return t.format(config.format.date.summaryModal.access.weekDay)+' '+getGreetingTime(t)+', '+t.format(config.format.date.summaryModal.access.date);
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
