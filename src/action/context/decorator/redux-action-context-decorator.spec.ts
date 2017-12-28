import { ReduxActionContextDecorator } from './redux-action-context-decorator';

@ReduxActionContextDecorator.forClass({prefix: 'prefix://foo/bar'})
class SomeClass {

}

describe('ReduxActionContextDecorator', () => {

    it('decorates the class', () => {

        expect(ReduxActionContextDecorator.get(SomeClass)).toEqual({
            prefix: 'prefix://foo/bar',
        });

    });

});