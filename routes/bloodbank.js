const router = require('express').Router()
const bloodBank = require('../model/blood.bank')
const sessionHandler = require('../model/blood.request')
const bloodRequest = require('../model/blood.request')
router.post('/', sessionHandler, async () => {
    return res.json({ error: true, msg: "Hello" })
})
router.post('/request', sessionHandler, async (req, res) => {
    const body = req.body
    console.log(body);
    return res.json({ error: true, msg: "Hello" })



    


})
router.get('/all', async (req, res) => {
    bloodBank.find().then(data => {
        return res.json({ records: data, number: data.length })
    }).catch(er => {
        return res.json({ er })
    })
})
router.get('/list', async (req, res) => {
    const query = req.query
    const city = query.city
    const pageNumber = query.page
    const limit = 20

    const data = await bloodBank.find()
    const totalLength = data.length
    // console.log(totalLength)
    const totalPage = Math.round(totalLength / limit)
    if (!city && !pageNumber) {
        bloodBank.find().limit(limit).then(data => {
            return res.json({
                error: false, records: data,
                currentPage: 1,
                totalPage: totalPage
            })
        }).catch(er => {
            return res.json({ er })
        })
    }
    if (!city && pageNumber) {
        const skip = (pageNumber - 1) * limit
        // console.log(option)
        bloodBank.find()
            .skip(skip)
            .limit(limit)
            .then(data => {
                return res.json({
                    error: false, records: data,
                    currentPage: pageNumber,
                    totalPage: totalPage
                })
            }).catch(er => {
                return res.json({ er })
            })
    }
    if (city) {
        bloodBank.find({
            $or: [
                { city: { '$regex': city, '$options': 'i' } },
                { district: { '$regex': city, '$options': 'i' } },
            ]
        })
            .then(data => {
                return res.json({
                    error: false, records: data
                })
            }).catch(er => {
                return res.json({ er })
            })
    }

})



module.exports = router