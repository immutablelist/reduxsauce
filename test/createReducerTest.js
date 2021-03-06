import test from 'ava'
import createReducer from '../lib/createReducer'

test('throws an error when initial state is missing', (t) => {
  t.throws(() => createReducer(null))
  t.throws(() => createReducer())
})

test('throws an error when the handlers are not an object', (t) => {
  t.throws(() => createReducer(1, 0))
  t.throws(() => createReducer(1, null))
  t.throws(() => createReducer(1))
})

test('creates a reducer function', (t) => {
  t.truthy(createReducer(1, {}))
})

test('dodges the wrong actions', (t) => {
  const a = (state, action) => state + 1
  const r = createReducer(0, { 'hi': a })
  const v = r(5, {type: 'wrong'})
  t.is(v, 5)
})

test('dodges null actions', (t) => {
  const a = (state, action) => state + 1
  const r = createReducer(0, { 'hi': a })
  const v = r(5, null)
  t.is(v, 5)
})

test('dodges actions with no type', (t) => {
  const a = (state, action) => state + 1
  const r = createReducer(0, { 'hi': a })
  const v = r(5, { bad: 'type' })
  t.is(v, 5)
})

test('invokes the correct actions', (t) => {
  const i = 5
  const a = (state, action) => state + 1
  const r = createReducer(i, { 'hi': a })
  const v = r(i, {type: 'hi'})
  t.is(v, 6)
})

test('invokes the correct action on an object', (t) => {
  const i = { i: 5 }
  const a = (state, action) => ({ i: state.i + 1 })
  const r = createReducer(i, { 'hi': a })
  const v = r(i, { type: 'hi' })
  t.deepEqual(v, { i: 6 })
})

