import { ReduxStateDecorator } from './redux-state-decorator';

@ReduxStateDecorator.forClass({
    name: 'state-1-2-3',
})
class FooState {

}

describe('ReduxStateDecorator', () => {

    it('decorates the class', () => {

        expect(ReduxStateDecorator.get(FooState)).toEqual({
            name: 'state-1-2-3',
        });

    });

});