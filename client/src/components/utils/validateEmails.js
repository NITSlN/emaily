const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default emails =>{
    const invalidEmails = emails.split(',').map(email => email.trim()).filter(email=> re.test(email)===false).filter(email=> (email!=='')) // re.test test the validity of the email
    
    if(invalidEmails.length){
        return `Invalid Email:${invalidEmails}`
    }
    return
}

