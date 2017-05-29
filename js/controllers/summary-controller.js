function summary_controller($scope, $filter, $timeout, summaryAPI, studentAPI) {
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
                format: 'dddd, MMMM Do YYYY'
            },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last 2 Months': [moment().subtract(2, 'month').startOf('month'), moment().endOf('month')]
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
        displayProp: "id",
        enableSearch: true,
        scrollable: true,
        smartButtonMaxItems: 3,
        smartButtonTextConverter: function(itemText, originalItem) {
            return itemText;
        }
    };
    $scope.completeSummaries = undefined;
    $scope.summariesInterval = undefined;
    $scope.clearData = function() {
        $scope.summaries = [];
        $scope.completeSummaries = undefined;
        $scope.summariesInterval = undefined;
    }
    $scope.requestSummaries = function(requestData) {
        summaryAPI.getSummaries(requestData).then(function(response) {
            $scope.completeSummaries = response.data;
        });
        $timeout(function() {
            console.log(requestData);
            endDateOriginal = requestData.endDate;
            if (endDateOriginal - requestData.startDate >= 1209600000) {
                $scope.summariesInterval = 'month';
            }
            else if (endDateOriginal - requestData.startDate >= 5011200000) {
                $scope.summariesInterval = 'week';
            }
            else if (endDateOriginal - requestData.startDate > 172800000) {
                $scope.summariesInterval = 'day';
            }
            while (requestData.startDate.clone().add(1, $scope.summariesInterval).isBefore(endDateOriginal)) {
                requestData.endDate = requestData.startDate.clone().add(1, $scope.summariesInterval);
                if (requestData.endDate > endDateOriginal) {
                    requestData.endDate = endDateOriginal;
                }
                summaryAPI.getSummaries(requestData).then(function(response) {
                    $scope.summaries.push(response.data);
                });
                requestData.startDate.add(1, $scope.summariesInterval);
            }
        }, 3000);
    }
    $scope.showLearningGoals = function(learningGoals) {
        ModalService.showModal({
            templateUrl: '../../view/modals/learning-goals-modal.html',
            controller: "LearningGoalsModal",
            inputs: {
                data: learningGoals
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close();
        });
    };

}
