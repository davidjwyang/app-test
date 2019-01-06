import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import fetch from 'node-fetch'
import Mongo from 'mongodb'

const app = express()

app.use(express.static('static'))
app.use(bodyParser.json())

app.get('/app/api/profile/:userId', (req, res) => {
	let query = { userId: req.params.userId }
	let proj = { projection : { wag : 1, _id : 0 } }
	db.collection('test').findOne(query, proj).then(profile => {
		console.log(JSON.stringify(profile))
		res.json(profile)
	}).catch(error => {
		console.log(error)
		res.status(500).json({ message: `Internal Server Error: ${error}` })
	})
})

app.post('/app/api/profile/:userId', (req, res) => {
	const newProfile = { userId : req.params.userId, 
		wag : { to : [],  from : [] },
		descrip : req.body
	}
	// newProfile.created = new Date()
	// When creating new profile, also create new wag document for user. 
	db.collection('test').insertOne(newProfile).then(result => { 
		return db.collection('test').findOne({ _id: result.insertedId })
	}).then(newProfile => {
		res.json(newProfile)
	}).catch(error => {
		console.log(error)
		res.status(500).json({ message: `Internal Server Error: ${error}` })
	})
})

app.get('*', (req, res) => {
	res.sendFile(path.resolve('./static/index.html'))
})

let db
let MongoClient = Mongo.MongoClient
MongoClient.connect('mongodb://localhost').then(connection => {
	db = connection.db('sniff') 
	app.listen(4000, () => {
		console.log('App started on port 4000')
	})
}).catch(error => {
	console.log('ERROR: ', error)
})
