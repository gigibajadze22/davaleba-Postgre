import nodemailer from 'nodemailer'




const sendEmail = async(email,subject,html) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
        // d
      }) 
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html,
      }

try{
    await transporter.sendMail(mailOptions)
    console.log('Email sent succesfully');
    return true;
}catch(err){
    console.error('Error sending email', err);
    return false
}
}

export default sendEmail