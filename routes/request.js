const bloodRequest = require('../model/blood.request')
const sessionHandler = require('../utils/session')
const user = require('../model/user')
const router = require('express').Router()

router.post('/new/request', sessionHandler, async (req, res) => {

    // return res.json({error:true , msg:"It will handler here"})
    const body = req.body
    const reciever = body?.reciever
    const unit = body?.unit
    console.log(body);
    // const userId = req.params.uid
    const _user = req.user
    const userId = _user._id

    if (!unit || !reciever) {
        return res.json({ error: true, msg: "Request param is missing" })
    }


    const option = {
        requestedBy: userId,
        requestedTo: reciever,
        quantity: unit
    }
    const newbloodreq = new bloodRequest(option)

    newbloodreq.save().then(data => {
        return res.json({ error: false, msg: "New request save", record: data })
    }).catch(er => {
        return res.json({ error: true, msg: er.message })
    })
})

router.get('/requested', sessionHandler, async (req, res) => {
    const _user = req.user
    const userId = _user._id
    bloodRequest.find({ requestedTo: userId }).then(async data => {
        console.log(data);
        // return res.json({ error: false, msg: "Required", record: data })
        var records = [];
        for(let i=0 ; i<data.length ;i++){
            console.log(data);
            
            const requestBy = data[i]?.requestedBy
           await user.findById(requestBy).then(_data=>{
                console.log(data);
                const item = {
                    name:_data?.name,
                    qty:data[i]?.quantity,
                    group:_data?.bloodGroup,
                    status:data[i].status,
                    _id:data[i]._id
                }
                records.push(item);
            }).catch(er=>{
                console.log(er);
            })
        }
        return res.json({error:false , record:records})
    }).catch(er => {
        return res.json({ error: true, msg: er.message })
    })
})
router.post('/mark' , sessionHandler  ,async(req ,res)=>{
    const _user = req.user
    const userId = _user._id
    const _id = req.body?.id
    const status = req.body.status
    console.log(req.body);
    
    bloodRequest.findByIdAndUpdate(_id , {status:status}).then(data=>{
        console.log(data);
        return res.json({error:false , msg:"Status modified" , data:data})
    }).catch(er=>{
        return res.json({error:true , msg:er})
    })
})

module.exports = router