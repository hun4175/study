
export interface URL {
	protocol: string
	domain: string
	port: string
	path: string
	search: string
}

export const parseUrl = (url: string) : URL => {
	const result: URL = {
		protocol: '',
		domain: '',
		port: '',
		path: '',
		search: ''
	}
	const matches = url.match('^(https?:\\/\\/)?([^\\/\\s:]+)?(:\\d+)?(\\/[^\\s?]*)?(\\?[^\\s#]*)?(#[^\\s]*)?$')
	if (matches) {
		result.protocol = matches[1] || ''
		result.domain = matches[2] || ''
		result.port = matches[3] || ''
		result.path = matches[4] || ''
		result.search = matches[5] || ''
	}
	return result
}