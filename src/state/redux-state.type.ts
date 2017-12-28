import { ReduxStateInterface } from './redux-state.interface';

export interface ReduxStateType {
    new (...args: any[]): ReduxStateInterface<{}>;
}
