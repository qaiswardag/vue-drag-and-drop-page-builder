import {useAjax} from "../../composables/use-ajax";

export default {
    namespaced: true,

    // state
    state: {
        notifications: [
            {
                title: 'This a notification title 1',
                description: 'And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.',
                image: 'https://images.unsplash.com/photo-1668307296853-16b595e881c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                id: 1
            },
            {
                title: 'This a notification title 2',
                description: 'Typesetter chose to garble a well known text, or whether a quirk in the 1914 Loeb Edition inspired a graphic designer, it\'s admittedly an odd way for Cicero to sail into the 21st century.',
                image: 'https://images.unsplash.com/photo-1560419450-a53fe3b90211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
                id: 2
            },
            {
                title: 'This a notification title 3',
                description: 'Garble a well known but would have been sacrilegious text, or whether a quirk in the 1914 Loeb Edition inspired a graphic designer, it\'s admittedly an odd way for Cicero to sail into the 21st century.',
                image: 'https://images.unsplash.com/photo-1667998709505-594a3e92b257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                id: 3
            },
            {
                title: 'This a notification title 4',
                description: 'Would have been sacrilegious) text, or whether a quirk in the 1914 Loeb Edition inspired a graphic designer, it\'s admittedly an odd way for Cicero to sail into the 21st century.',
                image: 'https://images.unsplash.com/photo-1668015777649-053a0fefce3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                id: 4
            },
            {
                title: 'This a notification title 5',
                description: 'Text, or whether a quirk in the 1914 Loeb Edition inspired a graphic designer, it\'s admittedly an odd way for Cicero to sail into the 21st century.',
                image: 'https://images.unsplash.com/photo-1667803622947-256fa468ae64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                id: 5
            },
            {
                title: 'This a notification title 3',
                description: 'Garble a well known but would have been sacrilegious text, or whether a quirk in the 1914 Loeb Edition inspired a graphic designer, it\'s admittedly an odd way for Cicero to sail into the 21st century.',
                image: null,
                id: 6
            },
            {
                title: 'This a notification title 4',
                description: 'Would have been sacrilegious) text, or whether a quirk in the 1914 Loeb Edition inspired a graphic designer, it\'s admittedly an odd way for Cicero to sail into the 21st century.',
                image: 'https://images.unsplash.com/photo-1668067611084-80ce6db6bbe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
                id: 7
            },
            {
                title: 'This a notification title 5',
                description: 'Text, or whether a quirk in the 1914 Loeb Edition inspired a graphic designer, it\'s admittedly an odd way for Cicero to sail into the 21st century.',
                image: 'https://images.unsplash.com/photo-1668099547212-d33db209258a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                id: 8
            }
        ],
        // end state
    },

    // getters
    getters: {
        getNotifications(state) {
            return state.notifications
        }
        // end getters
    },

    // mutations
    mutations: {
        setNotifications(state, payload) {
            state.notifications = payload
        },
        // end mutations
    },

    // actions
    actions: {
        // end action
    },
};
