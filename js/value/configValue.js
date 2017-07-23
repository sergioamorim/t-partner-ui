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
                ACTIVITY_LOOP: 'Badge',
                GAMIFICATION_HISTORIC: 'Gamification historic',
                DOMAIN_LEARNING_GOAL: 'Domain learning goal'
            },
            activityLoop: {
                EngagementLoop_AssistirCompletamenteVideoAula: 'Assistir uma vídeo aula',
                EngagementLoop_AlcancarNivelMaximo: 'Alcançar o nível máximo',
                EngagementLoop_DesafioCincoSeguidas: 'Acertar 5 questões consecutivas',
                EngagementLoop_DesafioTresSeguidas: 'Acertar 3 questões consecutivas',
                EngagementLoop_ResolverTodosSimuladosPlataforma: 'Resolver todos os simulados do MeuTutor',
                EngagementLoop_FazerPrimeiroSimulado: 'Fazer o primeiro simulado',
                EngagementLoop_AvancarNivel: 'Subir de nível',
                EngagementLoop_ObterPrimeiraMedalhaOuro: 'Ganhar a primeira medalha de ouro',
                EngagementLoop_ObterPrimeiraMedalhaPrata: 'Ganhar a primeira medalha de prata',
                EngagementLoop_ResolverProblemaCorretamente: 'Acertar uma questão',
                EngagementLoop_ResolverSimulado: 'Resolver um simulado',
                EngagementLoop_AprenderAssunto: 'Aprender um assunto'
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
