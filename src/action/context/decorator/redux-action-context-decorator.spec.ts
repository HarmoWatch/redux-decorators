import { ReduxActionContextDecorator, ReduxActionContextDecoratorForClass } from './redux-action-context-decorator';

@ReduxActionContextDecoratorForClass({prefix: 'prefix://foo/bar'})
class SomeClass {

}

describe('ReduxActionContextDecorator', () => {

    it('decorates the class', () => {

        expect(ReduxActionContextDecorator.get(SomeClass)).toEqual({
            prefix: 'prefix://foo/bar',
        });

    });

});