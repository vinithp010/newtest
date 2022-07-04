const jwt = require('jsonwebtoken')
const config = require("../../../../config/appConfig")
const { authFailureResponse } = require("../helpers/api-response/response.function") 
const { signaccesstoken } = require("../helpers").jwthelper
const user_Model = require("../models").user_model

const Helper = require("../helpers").common

const virifyaccesstoken = async(req, res, next)=>{
    let token,refreshtoken
    try {
        if(!req.headers['authorization']) return authFailureResponse(res, "Auth token require")
        const authheader = req.headers['authorization']
        const bearertoken = authheader.split(' ')
        token = bearertoken[1]
        refreshtoken =  req.headers['x-refresh-token']
        if(!token || !refreshtoken) return response.errorResponse(res, 401, "Authtoken require")
        try {
            let isverified = jwt.verify(token, config.JWT_SECTER_ACCESS_TOKEN)
            req.body.UserId = isverified.id._id
        } catch (error) {
            let isverified = jwt.verify(refreshtoken, config.JWT_SECTER_ACCESS_TOKEN)
            //-------pendng-------------//
            req.body.UserId = isverified.id._id
            let { jwtaccesstoken } = await signaccesstoken({
                _id:req.body.UserId
            },false)
            token = jwtaccesstoken
        }
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', token);
        res.set('x-refresh-token', refreshtoken);
        next()
    } catch (error) {
       return authFailureResponse(res, "please try to login again")
    }
}

module.exports = {
    virifyaccesstoken
}
