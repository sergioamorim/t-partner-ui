function summary_controller($scope, $filter, $uibModal, $route, summaryAPI, studentAPI, config) {
    $scope.config = config;
    $scope.requestData = {
        students: [],
        startDate: null,
        endDate: null
    };
    $scope.daterangepicker = {
        daterange: {
            startDate: null,
            endDate: null
        },
        options: {
            locale: {
                format: config.format.date.summary.daterangepicker
            },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last 2 Months': [moment().subtract(2, 'month').startOf('month'), moment().endOf('month')],
                'Test': [moment().set({'year': 2015, 'month': 4, 'date': 1}), moment().set({'year': 2015, 'month': 11, 'date': 31})]
            },
            eventHandlers: {
                'hide.daterangepicker': function() {
                    $scope.requestData.startDate = $scope.daterangepicker.daterange.startDate;
                    $scope.requestData.endDate = $scope.daterangepicker.daterange.endDate;
                }
            }
        }
    }
    $scope.summaries = [];
    studentAPI.getStudents().then(function(data) {
        $scope.students = data.data;
    });
    $scope.studentDropdownSettings = {
        displayProp: 'id',
        enableSearch: true,
        scrollable: true,
        smartButtonMaxItems: 3,
        smartButtonTextConverter: function(itemText, originalItem) {
            return itemText;
        }
    };
    $scope.completeSummaries = undefined;
    $scope.summariesInterval = undefined;
    $scope.reload = function() {
        $route.reload();
    };

    $scope.getSummariesFraction = function (requestData, endDateOriginal) {
        if (requestData.startDate.isBefore(endDateOriginal) || requestData.startDate.isSame(endDateOriginal)) {
            requestData.endDate = requestData.startDate.clone().add(1, $scope.summariesInterval);
            if (requestData.endDate > endDateOriginal) {
                requestData.endDate = endDateOriginal;
            }
            summaryAPI.getSummaries(requestData).then(function(response){
                $scope.summaries.push(response.data);
                requestData.startDate.add(1, $scope.summariesInterval);
                $scope.getSummariesFraction(requestData, endDateOriginal);
            });
        }
    };
    $scope.requestedSummaries = false;
    $scope.requestSummaries = function(requestData) {
        summaryAPI.getSummaries(requestData).then(function(response){
            endDateOriginal = requestData.endDate;
            $scope.completeSummaries = response.data;
            if (requestData.endDate - requestData.startDate >= 5011200000) {
                $scope.summariesInterval = 'month';
            }
            else if (requestData.endDate - requestData.startDate >= 1209600000) {
                $scope.summariesInterval = 'week';
            }
            else {
                $scope.summariesInterval = 'day';
            }
            $scope.getSummariesFraction(requestData, endDateOriginal);
        });
        $scope.requestedSummaries = true;
    };

    $scope.accesses = {
        data: [],
        make: function(actions){
            if (actions.length > 0){
                var access = {
                    timeStart: actions[0].subSession.timeStart,
                    actions: []
                };
                $scope.accesses.inflateAccess(access, actions);
                $scope.accesses.data.push(access);
                $scope.accesses.make(actions);
            }
        },
        inflateAccess: function(access, actions) {
            if (actions.length > 0 && (access.actions.length == 0 || access.actions[access.actions.length-1].subSession.id == actions[0].subSession.id)) {
                access.actions.push(actions[0]);
                actions.shift();
                $scope.accesses.inflateAccess(access, actions);
            }
        }
    };
    $scope.modals = {
        actions: {
            open: function (actions) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: false,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'view/modals/actions-modal.html',
                    controller: 'ActionsModalController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    size: 'lg',
                    resolve: {
                        accesses: function(){
                            return $scope.accesses;
                        }
                    }
                });
                $scope.accesses = [];
            }
        }
    }
}
