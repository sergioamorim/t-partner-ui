function summary_controller($scope, $filter, summaryAPI, studentAPI) {
    $scope.requestData = {
        students: [],
        startDate: null,
        endDate: null
    };
    $scope.daterangepickerOptions = {
        locale: {
            format: 'dddd, MMMM Do YYYY'
        },
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }
    $scope.summaryData = [];
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
    $scope.totalSummaryData = undefined;
    $scope.summaryInterval = undefined;
    $scope.clearData = function() {
        $scope.summaryData = [];
        $scope.totalSummaryData = undefined;
        $scope.summaryInterval = undefined;
    }
    $scope.requestSummary = function(requestData) {
        requestDateFormat = "yyyy-MM-dd";
        startDate = requestData.startDate;
        endDateOriginal = new Date(requestData.endDate.add(1, 'day'));
        if (endDateOriginal - startDate >= 1209600000) {
            $scope.summaryInterval = "month";
            while (startDate.clone().add(1, 'month') <= endDateOriginal) {
                endDate = startDate.clone().add(1, 'month');
                if (endDate > endDateOriginal) {
                    endDate = endDateOriginal;
                }
                summaryAPI.getSummary(requestData).success(function(data) {
                    $scope.summaryData.push(data);
                });
                startDate.add(1, 'month');
            }
        }
        else if (endDateOriginal - startDate >= 5011200000) {
            $scope.summaryInterval = "week";
            while (startDate.clone().add(1, 'week') <= endDateOriginal) {
                endDate = startDate.clone().add(1, 'week');
                if (endDate > endDateOriginal) {
                    endDate = endDateOriginal;
                }
                summaryAPI.getSummary(requestData).success(function(data){
                    $scope.summaryData.push(data);
                });
                startDate.add(1, 'week');
            }
        }
        else if (endDateOriginal - startDate > 172800000) {
            $scope.summaryInterval = "day";
            while (startDate.clone().add(1, 'day') <= endDateOriginal) {
                endDate = startDate.clone().add(1, 'day');
                if (endDate > endDateOriginal) {
                    endDate = endDateOriginal;
                }
                summaryAPI.getSummary(requestData).success(function(data) {
                    $scope.summaryData.push(data);
                });
                startDate.add(1, 'day');
            }
        }
        summaryAPI.getSummary(requestData).success(function(data){
            $scope.totalSummaryData = data;
        });
    };
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
