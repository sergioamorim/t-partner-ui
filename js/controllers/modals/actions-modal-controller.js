function actions_modal_controller($uibModalInstance, $scope, $filter, actions, moment) {
    $scope.actions = actions;
    $scope.getSubSessionTime = function (action) {
        var subSession = undefined;
        subSessionAPI.getSubSession(action.subSession).then(function(response) {
            subSession = response.data;
            return subSession.timeStart;
        });
    }
    $scope.getGreetingTime = function(m) {
        var t = moment(m);
        return t.format('dddd')+' '+getGreetingTime(t)+', '+t.format('MMMM Do YYYY');
    }
    $scope.actionBeautyfy = function (action) {
        var beautyAction = undefined;
        if (action.type == 'PROBLEM_SOLVING') beautyAction = 'Problem solving'
        else if (action.type == 'CONTENT_VIEW') beautyAction = 'Content view'
        else if (action.type == 'PROBLEM_BASED_EVALUATION') beautyAction = 'Problem based evaluation'
        else if (action.type == 'LEARNING_GOAL') beautyAction = 'Learning goal reached'
        else if (action.type == 'RESOURCE_SEQUENCE') beautyAction = 'Mission completed'
        else if (action.type == 'ACTIVITY_LOOP') beautyAction = 'Activity loop detected'
        else if (action.type == 'GAMIFICATION_HISTORIC') beautyAction = 'New level reached'
        else if (action.type == 'DOMAIN_LEARNING_GOAL') beautyAction = 'Domain learning goal'
        return beautyAction+' - '+$filter('amDateFormat')(action.time,'ddd D, h:mm:ss a');
    }
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
