const router = require('express').Router()
const { isEmpty } = require('../utils/util')
const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRound = parseInt(process.env.SALT_ROUND)
const keySecret = process.env.KEY_SECRET
const sessionHandler = require('../utils/session')
/**
 * function register to create new user
 * @param name , email , password , bloodGroup , isDonor
 */
router.post('/register', async (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password
    const bloodGroup = body.bloodGroup
    const name = body.name
    const isDonor = body.isDonor
    if (isEmpty(name)) return res.json({ error: true, msg: "Name is required" })
    if (isEmpty(email)) return res.json({ error: true, msg: "Email is required" })
    if (isEmpty(password)) return res.json({ error: true, msg: "Password is required" })
    if (isEmpty(bloodGroup)) return res.json({ error: true, msg: "Blood Group is required" })
    const salt = bcrypt.genSaltSync(saltRound)
    const hashPassword = bcrypt.hashSync(password, salt)
    const option = {
        name: name,
        email: email,
        password: hashPassword,
        bloodGroup: bloodGroup,
        isDonor: isDonor
    }
    const newUser = new user(option)
    newUser.save().then(response => {
        // const payload = {
        //     _id: data._id,
        //     email: data.email,
        //     name: data.name
        // }
        // const loginToken = jwt.sign(payload, keySecret)
        // // return res.json({ error: false, msg: "Login success", user: payload, loginToken: loginToken })
        // return res.json({ error: false, user: response, msg: "Registration success" })
        user.findOne({ email: email })
            .then(data => {
                // if (!data) return res.json({ error: true, msg: "Auth failed" })
                // const hashPassword = data.password
                // const flag = bcrypt.compareSync(password, hashPassword)
                // if (!flag) return res.json({ error: true, msg: "Auth failed , password incorrect" })
                const payload = {
                    _id: data._id,
                    email: data.email,
                    name: data.name
                }
                const loginToken = jwt.sign(payload, keySecret)
                return res.json({ error: false, msg: "Login success", user: payload, loginToken: loginToken })
            }).catch(er => {
                return res.json({ error: true, msg: er.message })
            })

    }).catch(er => {
        return res.json({ error: true, msg: er.message })
    })

    // return res.json({body})
})
/**
 * function login to auth user with email and password
 * @param email  , password
 */
router.post('/login', async (req, res) => {

    const body = req.body
    const email = body.email
    const password = body.password
    if (isEmpty(email)) {
        return res.json({ error: true, msg: "Email is required" })
    }
    if (isEmpty(password)) {
        return res.json({ error: true, msg: "Password is required" })
    }
    user.findOne({ email: email })
        .then(data => {
            if (!data) return res.json({ error: true, msg: "Auth failed" })
            const hashPassword = data.password
            const flag = bcrypt.compareSync(password, hashPassword)
            if (!flag) return res.json({ error: true, msg: "Auth failed , password incorrect" })
            const payload = {
                _id: data._id,
                email: data.email,
                name: data.name
            }
            const loginToken = jwt.sign(payload, keySecret)
            return res.json({ error: false, msg: "Login success", user: payload, loginToken: loginToken })
        }).catch(er => {
            return res.json({ error: true, msg: er.message })
        })

})

router.post('/isUserExist', async (req, res) => {

    const body = req.body
    const email = body.email
    if (!email) {
        return res.json({ error: true, msg: "Email is required" })
    }

    console.log(email);

    user.findOne({ email: email })
        .then(data => {
            if (!data) return res.json({ error: true, msg: "Auth failed" })
            const hashPassword = data.password
            const flag = bcrypt.compareSync("Ums!@#1234", hashPassword)
            if (!flag) return res.json({ error: true, msg: "Auth failed , password incorrect" })
            const payload = {
                _id: data._id,
                email: data.email,
                name: data.name
            }
            const loginToken = jwt.sign(payload, keySecret)
            return res.json({ error: false, msg: "Login success", user: payload, loginToken: loginToken })
        }).catch(er => {
            return res.json({ error: true, msg: er.message })
        })

})
router.get('/accesstoken', sessionHandler, async (req, res) => {
    const _user = req.user
    const _userId = _user._id
    user.findById(_userId).then(data => {
        const payload = {
            _id: data._id,
            email: data.email,
            name: data.name
        }
        return res.json({ error: false, msg: "Login token valid", user: payload })
    }).catch(er => {
        return res.json({ error: true, msg: "Login failed" })
    })

})

router.get('/list', async (req, res) => {
    // user.find().then(async data=>{
    //     console.log(data)
    //     const id = data._id
    //     console.log(id)
    //     user.findByIdAndDelete(id).then(data=>{
    //         console.log(data)
    //     }).catch(er=>{
    //         console.log(er)
    //     })
    // }).catch(er=>{
    //     return res.json({er})
    // })
    const userList = await user.find()
    // // for(let i=0;i<userList.length ;i++){
    // //     const element = userList[i]
    // //     // console.log(element)
    // //     const userId = element._id
    // //     // console.log(userId)
    // //     user.findByIdAndDelete(userId).then(data=>{
    // //         console.log(data)
    // //     }).catch(er=>{
    // //         console.log(er)
    // //     })
    // // }

    return res.json({ userList })

})

router.get('/search', sessionHandler, async (req, res) => {
    const _user = req.user
    const userId = _user._id
    console.log(userId)
    const bloodGroup = req.query.group
    user.find({ $and: [{ bloodGroup: bloodGroup }, { _id: { $ne: userId } }] })
        .then(data => {
            return res.json({ error: false, records: data, msg: "Found" })
        }).catch(er => {
            return res.json({ error: true, msg: er.message })
        })
})

router.get('/user/:uid', async (req, res) => {

    const userId = req.params.uid
    user.findById(userId).then(data => {
        return res.json({ error: false, msg: "Found", user: data })
    }).catch(er => {
        return res.json({ error: true, msg: "User not found" })
    })
})


module.exports = router