import { isEmpty } from 'lodash'

const getKeyArr = (node, keys) => {
	if (node.group) {
		node.group.forEach(x => {
			getKeyArr(x, keys)
		})
	} else {
		keys.push(node.key)
	}
}

export const getKeys = columns => {
	const keys = []
	getKeyArr({ text: 'start', group: columns }, keys)
	return keys
}

const getColspan = (node, leaf, visited) => {
	leaf[node.text] = 0
	visited[node.text] = true
	if (node.group) {
		node.group.forEach(x => {
			if (!visited[x.text]) {
				getColspan(x, leaf, visited)
				leaf[node.text] += leaf[x.text]
			}
		})
	} else {
		leaf[node.text] = 1
	}
}

const maxDepth = node => {
	if (!node) {
		return 0
	}
	let d = 0
	if (node.group) {
		node.group.forEach(x => {
			d = Math.max(d, maxDepth(x))
		})
	}
	return d + 1
}

const getRowspan = (node, leaf, i) => {
	if (node.group) {
		leaf[node.text] = 1
		i--
		node.group.forEach(x => {
			getRowspan(x, leaf, i)
		})
	} else {
		leaf[node.text] = i
	}
}

export const getHeaders = columns => {
	let headers = [[]]

	// get colspan
	const colspan = {}
	getColspan({ text: 'start', group: columns }, colspan, {})
	delete colspan['start']

	// get rowspan
	const depth = maxDepth({ text: null, group: columns })
	const rowspan = {}
	getRowspan({ text: 'start', group: columns }, rowspan, depth)
	delete rowspan['start']

	// get item
	let stack = [{ text: null, group: columns }],
		k = 0
	while (!isEmpty(stack)) {
		let len = stack.length
		for (let i = 0; i < len; i++) {
			let node = stack.shift()
			if (node.text) {
				if (headers.length < k) {
					headers.push([])
				}
				headers[k - 1].push({
					text: node.text,
					key: node.key,
					rowspan: rowspan[node.text] >= 2 ? rowspan[node.text] : null,
					colspan: colspan[node.text] >= 2 ? colspan[node.text] : null,
				})
			}
			if (node.group) {
				stack = stack.concat(node.group)
			}
		}
		k++
	}

	return headers
}
