import { ReduxActionDecorator } from '../../action/decorator/redux-action-decorator';
import { ReduxReducerDecorator } from './redux-reducer-decorator';

class SomeActionClass {

    @ReduxActionDecorator.forMethod()
    public addFoo() {

    }

}

class SomeReducerClass {

    @ReduxReducerDecorator.forMethod(SomeActionClass.prototype.addFoo)
    public addFoo() {

    }

}

describe('ReduxReducerMethodDecorator', () => {

    it('decorates the method', () => {
        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.addFoo)).toEqual(
            SomeActionClass.prototype.addFoo
        );
    });

});