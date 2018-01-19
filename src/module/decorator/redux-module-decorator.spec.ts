import { ReduxStateInterface } from '../../';
import { ReduxModuleDecorator } from './redux-module-decorator';

class State implements ReduxStateInterface<{}> {

    getInitialState(): {} {
        return null;
    }

}

class ReducerA {

}

class ReducerB {

}

@ReduxModuleDecorator.forClass({
    state: State,
    reducers: [ ReducerA, ReducerB ]
})
class FooModule {

}

describe('ReduxModuleClassDecorator', () => {

    it('decorates the class', () => {

        expect(ReduxModuleDecorator.get(FooModule)).toEqual({
            state: State,
            reducers: [ ReducerA, ReducerB ]
        });

    });

});