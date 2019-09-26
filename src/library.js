import './assets/css/style.scss'
import { getHeaders, getKeys } from './libs/helper'
import { debounce, throttle } from 'lodash'

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
		// grid에 class 붙임
		this.wrapper.classList.add('kma-table-wrapper')

		// create table
		const table = document.createElement('TABLE')
		table.classList.add('kma-table')
		this.wrapper.appendChild(table)
		this.table = table

		// create table content
		this.createHeader()
		this.createBody()

		// fix header to top
		this.fixHeader()
	}

	// 헤더 생성
	createHeader() {
		const thead = document.createElement('THEAD')
		this.table.appendChild(thead)
		this.thead = thead

		let headers = getHeaders(this.columns)
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
	}

	// 헤더 고정
	fixHeader() {
		let thList = this.thead.querySelectorAll('th')
		this.wrapper.addEventListener(
			'scroll',
			debounce(() => {
				thList.forEach(x => {
					x.style.transform = `translateY(${this.wrapper.scrollTop}px)`
				})
			}, 150)
		)
	}

	// 바디 생성
	createBody() {
		const keys = getKeys(this.columns)
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
		this.wrapper.classList.remove('kma-table-wrapper')
		this.wrapper.removeEventListener('scroll')
		this.table = null
	}
}

export default KmaGrid
