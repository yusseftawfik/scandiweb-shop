import React, { Component } from 'react';
import '../../Styles/Spinner.scss';

export default class Spinner extends Component {
	render () {
		return (
			<div className='spinner' >
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div >
		)
	}
}
