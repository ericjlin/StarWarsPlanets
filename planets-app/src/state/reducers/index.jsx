import { combineReducers } from 'redux';
import { planetReducer } from './planet.reducer';

const rootReducer = combineReducers({
    planetReducer,
});

export default rootReducer;