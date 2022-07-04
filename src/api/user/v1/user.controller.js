const services = require('./user.service')
const {generateOTP} = require('../../../helpers/otp.helper')
const response = require('../../../helpers/api-response/response.function')
const bcrypt = require('bcrypt')

const register = async (req,res)=>{ 
  try {
      let data = {email : req.body.email}
      
      let isuser = await services.readOneUser(data)
      if(isuser) return conflictResponse(res, "user already exists")
      req.body.password = await bcrypt.hash(req.body.password,10)
      let opt = generateOTP()
      let otpTime = Date.now()+(10*60000)

      data = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        language: req.body.language,
        gender: req.body.gender,
        otp: opt,
        otpTime: otpTime, 
        profilepic: req.body.profilepic,
      }

      let isreg = await services.addUser(data)
      if(!isreg) return response.internalFailureResponse(res, null, "unable to register")
      
      data = {
        email : req.body.email,
        otp : opt
      } 

      let issentmailotp = await sendmailotp(data)
      if(!issentmailotp) return response.internalFailureResponse(res, 500, "unable to send otp to email")
      return response.successResponse(res, isreg._id, 'User created successfully, Please verify account')
  } catch (error) {
      console.log(error)
  }  
}

const registerconfirm = async (req, res) =>{
  try {
      search = {
          email: req.params.email,
          otp: req.query.otp,
          otpTime: {$lte:Date.now()}
      }

      let data ={
          verified :true,
          otp: "expired"
      }
      let isverify = await Helper.update(user_Model, search, data)
      if(!isverify) return response.notFoundResponse(res, null, "invalid otp/email")
      return response.successResponse(res, null, "verified successfully")
  } catch (error) {
      console.log(error)
  }
}

const login = async (req, res)=>{
  try {
      let data = {
        email : req.body.email,
        status : 1,
      }
      let isread = await services.readOneUser(data)
      if(!isread) return response.notFoundResponse(res, "username, password not found")
      if(isread.status == 0 || isread.verified == "false") 
          return response.errorResponse(res, 404, "user not verified")

      if(await bcrypt.compare(req.body.password,isread.password)){
          const {jwtaccesstoken,jwtrefreshtoken} = await signaccesstoken({
              _id:isread._id,
          },true)
          let isupdate = await Helper.update(user_Model,{_id:isread._id},{refreshtoken:jwtrefreshtoken})
          res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
          res.set('x-token', jwtaccesstoken);
          res.set('x-refresh-token', jwtrefreshtoken);
          return response.successResponse(res, 200, isread._id)
      }
      return response.errorResponse(res, 404, "username, password not found")
  } catch (error) {
      console.log(error)
  }
}

const getuser = async (req, res)=>{
  try {
    let data = {
      _id: req.body.UserId
    }
    let isread = services.readOneUser(data)
    if(!isread) return response.notFoundResponse(res, "no tweet found")
    return response.successResponse(res, isread, 'read Successfully')
  } catch (error) {
    console.log(error)
  }
}

const usersearch = async (req, res)=>{
  try {
    let data = {
      userName: /req.query.search/
    }
    let isread = services.readOneUser(data)
    if(!isread) return response.notFoundResponse(res, "no tweet found")
    return response.successResponse(res, isread, 'read Successfully')
  } catch (error) {
    console.log(error)
  }
}

const removeuser = async (req, res)=>{
  try {
    let data = {
      _id: req.body.UserId
    }
    let isadd = services.removeUser(data)
    if(!isadd) return response.notFoundResponse(res, "no user found to remove")
    return response.successResponse(res, null, 'user removed Successfully')
  } catch (error) {
    console.log(error)
  }
}

const addtweet = async (req, res)=>{
  try {
    let hashTags = req.body.tweet.match(/\#[^\s]+/g)

    let data = {
      userId:req.body.userid,
      tweet: req.body.tweet,
      hashTag: hashTags
    }
    let isadd = services.addTweet(data)
    if(!isadd) return response.notFoundResponse(res, "invalid otp/email")
    return response.successResponse(res, null, 'Tweet added Successfully')
  } catch (error) {
    console.log(error)
  }
}

const readalltweet = async (req, res)=>{
  try {
    let data = {
      userid: /req.params.id/
    }
    let isread = services.readalltweet(data)
    if(!isread) return response.notFoundResponse(res, "no tweet found")
    return response.successResponse(res, isread, 'read Successfully')
  } catch (error) {
    console.log(error)
  }
}

const removetweet = async (req, res)=>{
  try {
    let data = {
      _id: req.params.id,
      userid: req.body.UserId
    }
    let isadd = services.removeTweet(data)
    if(!isadd) return response.notFoundResponse(res, "no tweet found to remove")
    return response.successResponse(res, null, 'Tweet removed Successfully')
  } catch (error) {
    console.log(error)
  }
}

const followuser = async (req, res)=>{
  try {
    let data = {
      userid: req.body.UserId,
      followid: req.query.followid
    } 
    
    let isadd = services.addfollow(data)
    if(!isadd) return response.internalFailureResponse(res, null, "unable to send otp to email")
    return response.successResponse(res, null, 'Followed Successfully')

  } catch (error) {
    console.log(error)
  }
}

const tweetsearch = async (req, res)=>{
  try {
    let data = {
      tweet: /req.query.search/
    }
    let isread = services.searchTweet(data)
    if(!isread) return response.notFoundResponse(res, "no tweet found")
    return response.successResponse(res, isread, 'read Successfully')
  } catch (error) {
    console.log(error)
  }
}

const hashtagsearch = async (req, res)=>{
  try {
    let data = {
      hashTag: {"$in":req.query.hashTag}
    }
    let isread = services.searchHashTag(data)
    if(!isread) return response.notFoundResponse(res, "no tweet found in this hashtag")
    return response.successResponse(res, isread, 'read Successfully')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  register,
  registerconfirm,
  login,
  getuser,
  usersearch,
  removeuser,
  addtweet,
  readalltweet,
  removetweet,
  followuser,
  tweetsearch,
  hashtagsearch,

}