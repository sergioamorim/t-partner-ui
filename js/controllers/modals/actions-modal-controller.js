function actions_modal_controller($uibModalInstance, $scope, $filter, actions, moment, config) {
    $scope.config = config;
    $scope.actions = actions;
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
                    showActions: false,
                    actions: []
                }
                $scope.accesses.inflateCapsule(capsule, actions);
                access.capsules.push(capsule);
                $scope.accesses.inflateAccess(access, actions);
            }
        },
        inflateCapsule: function(capsule, actions) {
            if (actions.length > 0 && (capsule.actions.length == 0 || capsule.actions[capsule.actions.length-1].type == actions[0].type)) {
                if (capsule.actions.length == 0) {
                    var timeSpentDuration = moment.duration(actions[0].timeSpent);
                    capsule.timeStart = moment(actions[0].time);
                    capsule.timeStart.subtract(actions[0].timeSpent/1000, 'seconds');
                    if (actions[0].hasOwnProperty('educationalResource')) {
                        if (actions[0].hasOwnProperty('correctlyDone')) {
                            capsule.type = 'PROBLEM_SOLVING';
                        }
                        else {
                            capsule.type = 'CONTENT_VIEW';
                        }
                    }
                    else {
                        capsule.type = actions[0].type;
                    }
                }
                if ((actions.length > 1 && actions[1].type != capsule.type) || actions.length == 1) {
                    capsule.timeEnd = moment(actions[0].time);
                }
                capsule.timeSpent.add(moment.duration(actions[0].timeSpent/1000, 'seconds'));
                capsule.actions.push(actions[0]);
                actions.shift();
                $scope.accesses.inflateCapsule(capsule, actions);
            }
        }
    };
    $scope.accesses.make($scope.actions);

    $scope.toggleShowActions = function(capsule) {
        capsule.showActions = capsule.showActions === false ? true: false;
    }

    $scope.getGreetingTime = function(m) {
        var t = moment(m);
        return t.format(config.format.date.summaryModal.access.weekDay)+' '+getGreetingTime(t)+', '+t.format(config.format.date.summaryModal.access.date);
    };


    $scope.getResource = function(action) {
        if (action.hasOwnProperty('educationalResource')) {
            var id = action.educationalResource.id.replace('MultipleChoiceProblem_','');
            return id.replace('Content_','');
        }
        return '';
    };

    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
