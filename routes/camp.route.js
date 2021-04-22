const router = require('express').Router()
const camp = require('../model/camp')
const sessionHandler = require('../utils/session')
router.post('/new', sessionHandler, async (req, res) => {

    const body = req.body
    const title = body.title
    const description = body.desc
    const date = body.date
    const startTime = body.start
    const endTime = body.end
    const _user = req.user
    const userId = _user._id

    const option = {
        title: title,
        desc: description,
        date: date, start: startTime,
        end: endTime,
        createdBy: userId
    }
    const newCamp = new camp(option)
    newCamp.save().then(data=>{

        return res.json({error:false , msg:"Camp has been scheduled"})
    }).catch(er=>{
        return res.json({error:true, msg:er})
    })
})

router.get('/' , async(req,res)=>{
    camp.find().then(data=>{

        return res.json({error:false , msg:"Found" ,data:data})
    }).catch(er=>{
        return res.json({error:true , msg:er})
    })
})

module.exports = router