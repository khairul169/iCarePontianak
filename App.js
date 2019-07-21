import React from 'react'
import AppNavigator from './src/AppNavigator'

const App = () => {
	// Disable warning message
	console.disableYellowBox = true;

	return (
		<AppNavigator />
	)
}

export default App
