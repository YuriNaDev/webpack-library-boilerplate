import './assets/css/app.css'
import KmaGrid from './library'
import axios from 'axios'

let grid = null

function app() {
	axios.get('http://localhost:3000/weather?_limit=20').then(({ data }) => {
		grid = new KmaGrid({
			el: '#grid',
			columns: [
				// { text: 'SNo.', key: 'sno' },
				// {
				// 	text: 'Name',
				// 	group: [{ text: 'name1', key: 'n1' }, { text: 'name2', key: 'n2' }],
				// },
				// {
				// 	text: 'Language',
				// 	group: [
				// 		{ text: 'Native', key: 'native' },
				// 		{
				// 			text: 'others',
				// 			group: [{ text: 'others2', key: 'o2' }, { text: 'others3', key: 'o3' }],
				// 		},
				// 	],
				// },
				{ text: '도시', key: 'city' },
				{
					text: '위경도',
					group: [{ text: '경도', key: 'lon' }, { text: '위도', key: 'lat' }],
				},
				{
					text: '온도',
					group: [
						{ text: '현재', key: 'tmp' },
						{ text: '최고', key: 'tmn' },
						{ text: '최저', key: 'tmx' },
					],
				},
				{ text: '기압', key: 'ps' },
				{ text: '습도', key: 'reh' },
				{ text: '바람', group: [{ text: '풍속', key: 'ws' }, { text: '풍향', key: 'wd' }] },
				{ text: '구름량', key: 'cloud' },
			],
			data: data,
		})
	})
}
app()

if (module.hot) {
	module.hot.accept('./library', () => {
		console.log('[HMR] Hot Module Replacement...')
		if (grid) {
			grid.destroy()
			grid.create() // app()
		}
	})
}
