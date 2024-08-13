// index.test.ts
import { createEmitter, type Emitter } from '../index'
import { describe, expect, it, vi } from 'vitest'

describe('createEmitter function test', () => {
	it('should create an emitter', () => {
		vi.spyOn(console, 'log')

		const emitter: Emitter = createEmitter()

		// test emit function
		emitter.on('hello', (value) => {
			console.log(`hello 1 ${value}`)
		})

		emitter.emit('hello', 'world')
		// expect console.log to be called with 'hello 1 world'
		expect(console.log).toBeCalledWith('hello 1 world')
	})

	it('should remove a listener', () => {
		vi.spyOn(console, 'log')

		const emitter: Emitter = createEmitter()
		const listener1 = (value: string) => console.log(`listener 1: ${value}`)
		const listener2 = (value: string) => console.log(`listener 2: ${value}`)

		emitter.on('event', listener1)
		emitter.on('event', listener2)

		emitter.emit('event', 'test')
		// expect console.log to be called twice
		expect(console.log).toBeCalledTimes(2)

		emitter.off('event', listener1)
		emitter.emit('event', 'test')
		// expect console.log to be called only once (with listener 2)
		expect(console.log).toBeCalledTimes(3)
	})

	it('should not throw when removing a non-existent listener', () => {
		vi.spyOn(console, 'log')

		const emitter: Emitter = createEmitter()
		const listener = (value: string) => console.log(`listener: ${value}`)

		emitter.off('event', listener)
		// expect no error to be thrown
		expect(() => emitter.off('event', listener)).not.toThrow()
	})
})