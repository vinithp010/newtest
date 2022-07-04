const jwt = require('jsonwebtoken')
const env = require("../../configs/env.config") 

const signaccesstoken = (data,refresh)=>{
    return new Promise((resolve) =>{
        let result = {}
        result.jwtaccesstoken = jwt.sign({"id" : data},env.jwt.JWT_SECTER_ACCESS_TOKEN,{expiresIn: '20m'})
        if(refresh) result.jwtrefreshtoken = jwt.sign({"id" : data,"token":"refresh"},env.jwt.JWT_SECTER_ACCESS_TOKEN,{expiresIn: '1d'})
        resolve(result)
    })
}

module.exports = {
    signaccesstoken
}
