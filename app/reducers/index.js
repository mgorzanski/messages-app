import { combineReducers} from 'redux';
import { informations } from './informations';
import { user } from './user';

export default combineReducers({
    informations,
    user
});