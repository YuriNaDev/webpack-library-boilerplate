import './assets/css/style.scss'
import { getHeaders } from './libs/helper'

/**
 * 표 그리는 js 라이브러리
 *
 * @class KmaGrid
 */
class KmaGrid {
	constructor({ el, columns, data }) {
		this.columns = columns
		this.data = data
		this.wrapper = document.querySelector(el)
		this.table = null
		this.thead = null
		this.tbody = null

		this.create()
	}

	// grid 생성
	create() {
		// create table
		const table = document.createElement('TABLE')
		table.classList.add('kma-table')
		this.wrapper.appendChild(table)
		this.table = table

		// create header
		const thead = document.createElement('THEAD')
		this.table.appendChild(thead)
		this.thead = thead

		let [headers, keys] = getHeaders(this.columns)
		headers.forEach(arr => {
			let tr = document.createElement('TR')
			arr.forEach(x => {
				let th = document.createElement('TH')
				th.innerHTML = x.text
				if (x.colspan) th.colSpan = x.colspan
				if (x.rowspan) th.rowSpan = x.rowspan
				tr.appendChild(th)
			})
			this.thead.appendChild(tr)
		})

		// create body
		const tbody = document.createElement('TBODY')
		this.table.appendChild(tbody)
		this.tbody = tbody
		this.data.forEach(arr => {
			let tr = document.createElement('TR')
			keys.forEach(x => {
				let td = document.createElement('TD')
				td.innerHTML = arr[x]
				tr.appendChild(td)
			})
			this.tbody.appendChild(tr)
		})
	}

	// grid 삭제
	destroy() {
		this.wrapper.innerHTML = ''
		this.table = null
	}
}

export default KmaGrid
