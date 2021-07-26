import { createStore } from '@reduxjs/toolkit'

function reducer(state, action) {
    switch(action.type) {
        case 'ru': return { value: action.value };
        case 'us': return { value: action.value };
        case 'ua': return { value: action.value };

        default: return state;
    }
}

const store = createStore(reducer);

export default store;

