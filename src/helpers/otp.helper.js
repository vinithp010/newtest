const config = require("../../configs/env.config");
const nodemailer = require("nodemailer");

let generateOTP = ()=>{
    return Math.floor(1000 + Math.random() * 9000);
}

let sendmailotp = async (data)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.mail.ID,
          pass: config.mail.PASS
        },
    });
    let Subject = "Verified your otp"
    let Html =  '<b>Hello, we are from twitter</b>' + '<br><br>use this code <br><b>'+ data.otp +'</b> verifi you email'
    
    const options = {
        from: config.mail.ID,
        to: data.email,
        subject: Subject,
        html: Html
    }
    try {
        let info = await transporter.sendMail(options)
        if(info) return info
    } catch (error) {
        console.log(error)
    }                
}

module.exports = {
    generateOTP,
    sendmailotp
};
