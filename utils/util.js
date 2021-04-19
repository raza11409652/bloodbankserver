const isEmpty = (text)=>{
    if(text===null||text===undefined||text==='' ||text.length<1)return true

    return  false;
}
const formatString =(text)=>{
    if(isEmpty(text)) return null
    const result =text.split("'").join("")
    return  result
}
module.exports = {isEmpty , formatString}