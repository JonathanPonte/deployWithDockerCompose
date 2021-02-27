export const validateFormLogin = (email, password) => {
    let emailValidate = false;
    let passwordValidate = false;
    
    const validationEmail = /\S+@\S+\.\S+/;
    if(validationEmail.test(email)){
      emailValidate = true;
    }else {
      return false;
    }
    
    if(password.length >= 6){
      passwordValidate = true;
    }else {
      return false;
    }
    
    if(emailValidate && passwordValidate) {
      return true;
    }
    return false;
  }