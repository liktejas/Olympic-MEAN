const express = require('express')
const bcrypt = require('bcryptjs')
const path = require('path')
const router = new express.Router()
const Players = require('../models/players.model')
const Admins = require('../models/admin.model')

router.post('/api/players', async(req, res)=>{
    try {
        const addPlayerRecord = new Players(req.body)
        const insertRecord = await addPlayerRecord.save()
        // console.log(insertRecord)
        // console.log(req.body)
        res.status(201).send(insertRecord)
    } catch (error) {
        // console.error(error)
        res.status(400).send(error)
    }
})

router.get('/api/players', async(req, res)=>{
    try {
        const getPlayers = await Players.find({}).sort({"ranking":1})
        res.status(200).send(getPlayers)
    } catch (error) {
        // console.log(error)
        res.status(400).send(error)
    }
})

router.get('/api/players/:id', async(req, res)=>{
    try {
        const _id = req.params.id
        const getPlayers = await Players.findById(_id)
        // console.log(getPlayers)
        if(getPlayers == null){
            res.status(404).send({message:"Player Not Found", status: 404})
        }
        else{
            res.status(200).send(getPlayers)
        }
    } catch (error) {
        // console.log(error)
        res.status(400).send(error)
    }
})

router.patch('/api/players/:id', async(req, res)=>{
    try {
        const _id = req.params.id
        req.body['updated_at'] = new Date()
        const getPlayers = await Players.findByIdAndUpdate(_id, req.body, {new: true})
        // console.log(getPlayers)
        if(getPlayers == null){
            res.status(400).send({message:"Cannot Update Player, Player Not Found", status: 404})
        }else{
            res.status(200).send(getPlayers)
        }
    } catch (error) {
        // console.log(error)
        res.status(500).send(error)
    }
})

router.delete('/api/players/:id', async(req, res)=>{
    try {
        req.body['updated_at'] = new Date()
        const getPlayers = await Players.findByIdAndDelete(req.params.id)
        if(getPlayers == null){
            res.status(400).send({message:"Cannot Delete Player, Player Not Found", status: 404})
        }else{
            res.status(200).send(getPlayers)
        }
    } catch (error) {
        // console.log(error)
        res.status(500).send(error)
    }
})

router.post('/api/search', async(req, res)=>{
    try {
        // console.log(req.body.search)
        const getdata = await Players.find({$text:{$search:req.body.search}})
        if(getdata.length == 0){
            res.status(404).send({message:`${req.body.search} Not Found`, status: 404})
        }else{
            res.status(200).send(getdata)
        }
    } catch (error) {
        // console.log(error)
        res.status(500).send({message:"Error Occured", status: 500})
    }
})

router.post('/api/register', async(req, res)=>{
    try {

        const hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash
        // console.log(req.body)
        const addAdminRecord = new Admins(req.body)
        const insertRecord = await addAdminRecord.save()
        // console.log(insertRecord)
        res.status(201).send(req.body)
    } catch (error) {
        // console.log(error)
        res.status(500).send({message:"Registeration Failed", status: 500})
    }
})

router.post('/api/login', async(req, res)=>{
    try {
        // console.log(req.body)
        const getAdmin = await Admins.findOne({email:req.body.email})
        if(getAdmin == null){
            res.status(404).send({message:"Email Does Not Exist", status: 404})
        }
        else{
            let name = getAdmin.name
            const match = await bcrypt.compare(req.body.password, getAdmin.password)
            if(match){
                res.status(200).send({...req.body, name, message:"Login Successfull"})
            }else{
                res.status(401).send({message:"Login Failed", status: 401})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({message:"Login Failed", status: 401})
    }
})

module.exports = router