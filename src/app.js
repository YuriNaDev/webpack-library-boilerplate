import './assets/scss/app.scss'
import JsGrid from './library'

function app() {
	const grid = new JsGrid({
		el: '#grid',
		columns: [],
		data: [],
	})
	// const square = new Rectangle(10, 10)
	// console.log(square.area)
	// console.log(square.area)
}
app()

if (module.hot) {
	module.hot.accept('./library', () => {
		app()
	})
}
