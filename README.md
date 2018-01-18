# @harmowatch/redux-decorators

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)
[![Build Status](https://travis-ci.org/HarmoWatch/redux-decorators.svg?branch=master)](https://travis-ci.org/HarmoWatch/redux-decorators)
[![Coverage Status](https://coveralls.io/repos/github/HarmoWatch/redux-decorators/badge.svg?branch=master)](https://coveralls.io/github/HarmoWatch/redux-decorators?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/e2f8abd1a70656b59a63/maintainability)](https://codeclimate.com/github/HarmoWatch/redux-decorators/maintainability)
[![codebeat badge](https://codebeat.co/badges/9c43bf4d-4eab-4c5c-837d-473faf297f77)](https://codebeat.co/projects/github-com-harmowatch-ngx-redux-core-master)

## What is this package for?

This package provides a set of decorators you've to wire manually against [redux](https://redux.js.org/). The decorators
are used well in the Angular 2+ package [@harmowatch/ngx-redux-core](https://github.com/HarmoWatch/ngx-redux-core).

## The following decorators are available

### `ReduxActionDecorator`

- [ ] can be used on class declarations
- [x] can be used on class method declarations

When the decorated method was called it will invoke `ReduxActionDispatcher.dispatch`. Please
[checkout the documentation](https://github.com/HarmoWatch/redux-decorators#action-dispatching)
about `ReduxActionDispatcher` for more information about action dispatching.

```ts
class SomeActionClass {

    // (1.1) decorate a class method 
    @ReduxActionDecorator.forMethod({type: 'some-other-type'})
    public methodWithCustomType<T>(input: T): T {
        return input;
    }

    // (1.2) decorate a class method
    @ReduxActionDecorator.forMethod()
    public methodWithAutomaticType<T>(input: T): T {
        return input;
    }

}

// (2.1) get the decorated data (will return {type: 'some-other-type', contextClass: SomeActionClass})
ReduxActionContextDecorator.get(SomeActionClass.prototype.methodWithCustomType)

// (2.2) get the decorated data (will return {type: 'methodWithAutomaticType', contextClass: SomeActionClass})
ReduxActionContextDecorator.get(SomeActionClass.prototype.methodWithAutomaticType)
```

[take a look at the unit test](https://github.com/HarmoWatch/redux-decorators/blob/master/src/action/decorator/redux-action-decorator.spec.ts)


### `ReduxActionContextDecorator`

- [X] can be used on class declarations
- [ ] can be used on class method declarations

This decorator only makes sense together with the `ReduxActionDecorator`, because the configured prefix is used a prefix
for each configured action type. Please 
[see `ReduxActionDispatcher.getType`](https://github.com/HarmoWatch/redux-decorators#reduxactiondispatchergettype) for 
more information.

```ts
// (1) decorate the class
@ReduxActionContextDecorator.forClass({prefix: 'prefix://foo/bar'})
class SomeActionClass {

    @ReduxActionDecorator.forMethod({type: 'some-other-type'})
    public methodWithCustomType<T>(input: T): T {
        return input;
    }

    @ReduxActionDecorator.forMethod()
    public methodWithAutomaticType<T>(input: T): T {
        return input;
    }

}

// (2) get the decorated data (will return {prefix: 'prefix://foo/bar'})
ReduxActionContextDecorator.get(SomeActionClass)
```

[take a look at the unit test](https://github.com/HarmoWatch/redux-decorators/blob/master/src/action/context/decorator/redux-action-context-decorator.spec.ts)


### `ReduxReducerDecorator`

- [ ] can be used on class declarations
- [X] can be used on class method declarations

This decorator will wire a reducer class method against a method that was decorated by the `ReduxActionDecorator`.

```ts
class SomeReducerClass {

    // (1.1) decorate a class method 
    @ReduxReducerDecorator.forMethod(SomeActionClass.prototype.methodWithCustomType)
    public doSomething() {

    }

    // (1.2) decorate a class method 
    @ReduxReducerDecorator.forMethod([
        SomeActionClass.prototype.methodWithCustomType,
        SomeActionClass.prototype.methodWithAutomaticType,
    ])
    public doSomethingWhenOneOfTheActionsAreInvoked() {

    }

}

// (2.1) get the decorated data (will return SomeActionClass.prototype.methodWithCustomType)
ReduxReducerDecorator.get(SomeReducerClass.prototype.doSomething)

// (2.2) get the decorated data (will return [SomeActionClass.prototype.methodWithCustomType, SomeActionClass.prototype.methodWithAutomaticType])
ReduxReducerDecorator.get(SomeReducerClass.prototype.doSomethingWhenOneOfTheActionsAreInvoked)
```

[take a look at the unit test](https://github.com/HarmoWatch/redux-decorators/blob/master/src/reducer/decorator/redux-reducer-decorator.spec.ts)

### `ReduxStateDecorator`

- [X] can be used on class declarations
- [ ] can be used on class method declarations

```ts
// (1) decorate the class
@ReduxStateDecorator.forClass({name: 'state-1-2-3'})
class SomeStateClass {

}

// (2) get the decorated data (will return {name: 'state-1-2-3'})
ReduxStateDecorator.get(SomeStateClass)
```

[take a look at the unit test](https://github.com/HarmoWatch/redux-decorators/blob/master/src/state/decorator/redux-state-decorator.spec.ts)

## Action dispatching

### `ReduxActionDispatcher`

As already mentioned above there's a additional `static` class `ReduxActionDispatcher`. This class has two public static
methods:

#### `ReduxActionDispatcher.getType`

This method will resolve a valid redux action type for the given method. The given method must be decorated by
`ReduxActionDecorator.forMethod`. If the class of the method is also decorated by 
`ReduxActionContextDecorator.forClass`, then the defined `prefix` is prepended to the returned string.

[take a look at the unit test](https://github.com/HarmoWatch/redux-decorators/blob/master/src/action/dispatcher/redux-action-dispatcher.spec.ts)

#### `ReduxActionDispatcher.dispatch`

The `dispatch` method will emit a new action on the `rxjs.Subject` you can access by the public, readonly property
`ReduxActionDispatcher.dispatchedActions`. If the return value of the action method is an `Observable` or a `Promise`,
then the action is dispatched only if the `Observable` completes or the `Promise` resolves.

```ts
ReduxActionDispatcher.dispatchedActions.subscribe(action => {
    // do something when a action was dispatched i.e. fire the redux action on your store
})
```

[take a look at the unit test](https://github.com/HarmoWatch/redux-decorators/blob/master/src/action/dispatcher/redux-action-dispatcher.spec.ts)
