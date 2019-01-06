import React from 'react'
import { Button, Form, FormGroup, ControlLabel, FormControl, Row } from 'react-bootstrap'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.humanFields = ['name', 'race', 'ethnicity', 'age', 'height', 
			'occupation', 'hobbies', 'personality', 'instagram']
		this.dogFields = ['name', 'breed', 'size', 'age', 'hobbies', 'personality']
		this.userId ='user1'
		this.state = { fields : null, profile : null}

		this.onSubmit = this.onSubmit.bind(this)
		this.handleButton = this.handleButton.bind(this)
	}

	onSubmit(e) {
		e.preventDefault()
		let values = extractValues(e.target.elements)
		let fields = { human : null, dog : null }
		fields.human = createObject(this.humanFields, values.slice(0, this.humanFields.length))
		fields.dog = createObject(this.dogFields, values.slice(this.humanFields.length))
		this.setState({ fields })

		fetch(`/app/api/profile/${this.userId}`, {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify(fields)
		}).then(res => {
			console.log(res.text())
		}).catch(error => {
			console.log(error)
		})
	}

	handleButton(e) {
		e.preventDefault()
		fetch(`/app/api/profile/${this.userId}`).then(res => {
			return res.json()
		}).then(data => {
			this.setState({ profile : data })
		}).catch(error => {
			console.log(error)
		})

	}

	render() {
		return (
			<div>
				{JSON.stringify(this.state.fields)}
				<form onSubmit={this.onSubmit}>
					<h1>Human</h1>
					<FieldGroups ids={this.humanFields}/>	
					<h1>Dog</h1>
					<FieldGroups ids={this.dogFields}/>	
					<Button type='submit'>Submit</Button>
				</form>
				{JSON.stringify(this.state.profile)}		
				<Button type='button' onClick={this.handleButton}>get</Button>
			</div>
		)
	}
}

const FieldGroups = ({ids}) => {
	let fields = ids.map( id => {
		let idCap = id.charAt(0).toUpperCase() + id.slice(1)
		return(
			<FieldGroup
				id={id}
				type='text'
				label={idCap}
				placeholder={idCap}
			/>		
		)	
	})
	return fields
}

const FieldGroup = ({ id, label, help, ...props }) => {
	return(
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
		</FormGroup>
	)
}

// Extract the values form the e.target array 
const extractValues = (elements) => {
	let values = []
	for (let i = 0; i<elements.length; i++) {
		values.push(elements[i].value)
	}
	return values
}

// Creates object that holds input from form. 
const createObject = (keys, values) => {
	let obj = {}
	for (let i=0; i<keys.length; i++) {
		obj[keys[i]] = values[i]
	}
	return obj
}

export default App