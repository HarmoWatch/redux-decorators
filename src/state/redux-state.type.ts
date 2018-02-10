import { ReduxStateInterface } from './redux-state.interface';

export interface ReduxState<T extends ReduxStateInterface<{}> = ReduxStateInterface<{}>> {
    new (...args: any[]): T;
}