import { ReduxActionDecorator } from '../../';
import { ReduxReducerDecorator } from './redux-reducer-decorator';

class SomeActionClass {

    @ReduxActionDecorator.forMethod()
    public addFoo() {

    }

    @ReduxActionDecorator.forMethod()
    public addAnotherFoo() {

    }

}

class SomeReducerClass {

    @ReduxReducerDecorator.forMethod(SomeActionClass.prototype.addFoo)
    public addFoo() {

    }

    @ReduxReducerDecorator.forMethod([
        SomeActionClass.prototype.addFoo,
        SomeActionClass.prototype.addAnotherFoo,
    ])
    public addTwoFoos() {

    }

}

describe('ReduxReducerMethodDecorator', () => {

    it('decorates the method', () => {
        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.addFoo)).toEqual(
            SomeActionClass.prototype.addFoo
        );

        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.addTwoFoos)).toEqual([
            SomeActionClass.prototype.addFoo,
            SomeActionClass.prototype.addAnotherFoo,
        ]);
    });

});