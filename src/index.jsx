import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app.jsx'

const app = document.getElementById("app")

ReactDOM.render( <App/>, app)

if (module.hot) {
	module.hot.accept()
}
