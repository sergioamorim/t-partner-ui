function summary_controller($scope, $filter, summaryAPI, studentAPI) {
    $scope.requestData = {
        selectedStudents: [],
        startDate: null,
        endDate: null
    };
    $scope.daterangepickerOptions = {
        locale: {
            format: 'MMMM D, YYYY'
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
    $scope.selectedStudents = [];
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
        endDateOriginal = new Date(requestData.endDate.valueOf()+86400000);
        if (endDateOriginal - startDate >= 1209600000) {
            $scope.summaryInterval = "month";
            while (startDate.valueOf() + 2592000000 <= endDateOriginal) {
                endDate = startDate.valueOf() + 2592000000;
                if (endDate > endDateOriginal) {
                    endDate = endDateOriginal;
                }
                summaryAPI.getSummary(requestData.studentId, $filter('date')(startDate, requestDateFormat), $filter('date')(endDate, requestDateFormat)).success(function(data) {
                    $scope.summaryData.push(data);
                });
                startDate = new Date(startDate.valueOf()+2592000000);
            }
        }
        else if (endDateOriginal - startDate >= 5011200000) {
            $scope.summaryInterval = "week";
            while (startDate.valueOf() + 604800000 <= endDateOriginal) {
                endDate = startDate.valueOf() + 604800000;
                if (endDate > endDateOriginal) {
                    endDate = endDateOriginal;
                }
                summaryAPI.getSummary(requestData.studentId, $filter('date')(startDate, requestDateFormat), $filter('date')(endDate, requestDateFormat)).success(function(data){
                    $scope.summaryData.push(data);
                });
                startDate = new Date(startDate.valueOf()+604800000);
            }
        }
        else if (endDateOriginal - startDate > 172800000) {
            $scope.summaryInterval = "day";
            while (startDate.valueOf() + 86400000 <= endDateOriginal) {
                endDate = startDate.valueOf() + 86400000;
                if (endDate > endDateOriginal) {
                    endDate = endDateOriginal;
                }
                summaryAPI.getSummary(requestData.studentId, $filter('date')(startDate, requestDateFormat), $filter('date')(endDate, requestDateFormat)).success(function(data) {
                    $scope.summaryData.push(data);
                });
                startDate = new Date(startDate.valueOf()+86400000);
            }
        }
        summaryAPI.getSummary(requestData.studentId, $filter('date')(requestData.startDate, requestDateFormat), $filter('date')(endDateOriginal, requestDateFormat)).success(function(data){
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
