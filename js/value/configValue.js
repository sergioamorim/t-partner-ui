angular.module('TP').value('config', {
	rootUrl: 'http://localhost:8080',
	baseUrl: 'http://localhost:8080',

    dict: {
        studentAction: {
            type: {
                PROBLEM_SOLVING: 'Problem solving',
                CONTENT_VIEW: 'Content view',
                PROBLEM_BASED_EVALUATION: 'Problem based evaluation',
                LEARNING_GOAL: 'Learning goal',
                RESOURCE_SEQUENCE: 'Resource sequence',
                ACTIVITY_LOOP: 'Activity loop',
                GAMIFICATION_HISTORIC: 'Gamification historic',
                DOMAIN_LEARNING_GOAL: 'Domain learning goal'
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
