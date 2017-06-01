angular.module('TP').value('config', {
	rootUrl: 'http://localhost:8080',
	baseUrl: 'http://localhost:8080',

    dict: {
        studentAction: {
            type: {
                PROBLEM_SOLVING: 'Problem solving',
                CONTENT_VIEW: 'Content view',
                PROBLEM_BASED_EVALUATION: 'Problem based evaluation solving',
                LEARNING_GOAL: 'Learning goal reached',
                RESOURCE_SEQUENCE: 'Mission completed',
                ACTIVITY_LOOP: 'Activity loop detected',
                GAMIFICATION_HISTORIC: 'New level reached',
                DOMAIN_LEARNING_GOAL: 'Domain learning goal reached'
            }
        }
    },

    format: {
        date: {
            summary: {
                daterangepicker: 'dddd, MMMM Do YYYY',
                startingDay: 'fullDate'
            },
            summaryModal: {
                studentAction: 'ddd D, h:mm:ss a',
                access: {
                    weekDay: 'dddd',
                    date: 'MMMM Do YYYY'
                }
            }
        }
    }
})
