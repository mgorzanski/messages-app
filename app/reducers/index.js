import { combineReducers} from 'redux';
import { informations } from './informations';
import { user } from './user';
import { settings } from './settings';

export default combineReducers({
    informations,
    user,
    settings
});