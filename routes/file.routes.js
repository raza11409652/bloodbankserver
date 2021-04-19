const multer = require('multer')
const fs = require('fs');
const router = require('express').Router()
const csv = require('csv')
// const {formatString} = require('../utils/util')
const bloodBank = require('../model/blood.bank')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

let csvUpload = multer({storage: storage})
router.post('/upload', csvUpload.single('file'), async (req, res) => {
    var csvData=[];
    fs.createReadStream(req.file.path)
        .pipe(csv.parse({delimiter: ','}))
        .on('data', function(csvrow) {
            csvData.push(csvrow);
        }).on('end',function(){
        var index= 0 ;
        // console.log(csvData.length);
        csvData.forEach(elem=>{
            const element = elem

            const option ={
                number:element[0],
                name:element[1],
                state:element[2],
                district:element[3],
                city:element[4],
                address:element[5],
                pinCode:element[6],
                contactNumber:element[7],
                mobile:element[8],
                helpLine :element[9],
                fax:element[10],
                email:element[11],
                website:element[12],
                nodalOfficer:{
                    name:element[13],
                    contact:element[14],
                    mobile: element[15],
                    email:element[15],
                    qualification:element[17],

                 },
                category:element[18],
                bloodAvailable:element[19],
                apheresis:element[20],
                serviceTime:element[21],
                license:element[22],
                licenseObtainedOn:element[23],
                renewDate:element[24],
                latitude:element[25],
                longitude:element[26]
            }
            console.log(option)
            const newBank = new bloodBank(option)
            newBank.save().then(data=>{
                console.warn(data)
            }).catch(er=>{
                console.error(er)
            })
            index ++;

        })

        if(index===csvData.length){
            return res.json({
                error:false ,
                msg:"CSV  uploaded" ,
                filename:csvData
            }).status(200)
        }else{
            return res.json({error:false})
        }
    });
});

module.exports = router