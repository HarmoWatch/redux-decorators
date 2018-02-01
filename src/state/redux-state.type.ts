import { ReduxStateInterface } from './redux-state.interface';

export interface ReduxStateType<T extends ReduxStateInterface<{}> = ReduxStateInterface<{}>> {
    new (...args: any[]): T;
}