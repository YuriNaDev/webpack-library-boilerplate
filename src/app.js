import './assets/scss/app.scss'
import Rectangle from './library'

function app() {
	const square = new Rectangle(10, 10)
	console.log(square.area)
	// console.log(square.area)
}
app()

if (module.hot) {
	module.hot.accept('./library', () => {
		app()
	})
}
