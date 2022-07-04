const {userModel, tweetsModel, followModel} = require("../../../../database/models/models.model");

const addUser = async (data)=>{
    try {
        let usermodel = new userModel(data)
        let issave = await usermodel.save()
        if(issave) return issave
    } catch (error) {
        console.log(error)
    }
}

const removeUser = async (data)=>{
    try {
        let isremoved = await userModel.findByIdAndUpdate(data,{status:0},{new : true})
        if(isremoved) return isremoved
    } catch (error) {
        console.log(error)
    }
}

const readOneUser = async (data)=>{
    try {
        let issave = await userModel.findOne(data)
        if(issave) return issave
    } catch (error) {
        console.log(error)
    }
}

const addTweet = async (data)=>{
    try {
        let addtweet = new tweetsModel(data)
        let issave = await addtweet.save()
        if(issave) return issave
    } catch (error) {
        console.log(error)
    }
}

const readalltweet = async (data)=>{
    try {
        let issave = await tweetsModel.find(data)
        if(issave) return issave
    } catch (error) {
        console.log(error)
    }
}

const removeTweet = async (data)=>{
    try {
        let isremoved = await tweetsModel.findByIdAndUpdate(data,{status:0},{new : true})
        if(isremoved) return isremoved
    } catch (error) {
        console.log(error)
    }
}

const addfollow = async (data)=>{
    try {
        let isadd = new followModel(data)
        if(isadd) return issave
    } catch (error) {
        console.log(error)
    }
}

const searchTweet = async (data)=>{
    try {
        let isfind = await tweetsModel.find(data)
        if(isfind) return isfind
    } catch (error) {
        console.log(error)
    }
}

const searchHashTag = async (data)=>{
    try {
        let isfind = await tweetsModel.find(data)
        if(isfind) return isfind
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addUser,
    removeUser,
    readOneUser,
    addTweet,
    readalltweet,
    removeTweet,
    addfollow,
    searchTweet,
    searchHashTag
}