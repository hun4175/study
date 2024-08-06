// test code for the parseUrl function in ../index.ts
import { describe, expect, it } from 'vitest'
import { parseUrl, type URL } from '../index'


describe('parseUrl function test', () => {
	it('should parse as URL http', () => {
		const url = 'http://www.example.com'
    const expected: URL = {
      protocol: 'http://',
      domain: 'www.example.com',
      port: '',
      path: '',
      search: '',
    }
    expect(parseUrl(url)).toEqual(expected)
	})
	it('should parse a URL correctly', () => {
    const url = 'https://www.example.com/path?query=value'
    const expected: URL = {
      protocol: 'https://',
      domain: 'www.example.com',
			port: '',
      path: '/path',
      search: '?query=value',
    }
    expect(parseUrl(url)).toEqual(expected)
  })
	it('should parse a URL with multiple params', () => {
		const url = 'https://www.example.com/path?query=value&foo=bar'
    const expected: URL = {
      protocol: 'https://',
      domain: 'www.example.com',
      port: '',
      path: '/path',
      search: '?query=value&foo=bar',
    }
    expect(parseUrl(url)).toEqual(expected)
	})
  it('should handle relative URLs', () => {
    const url = '/path?query=value'
    const expected = {
      protocol: '',
			domain: '',
			port: '',
			path: '/path',
			search: '?query=value',
    }
    expect(parseUrl(url)).toEqual(expected)
  })
})