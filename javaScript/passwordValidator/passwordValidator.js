function validatePassword( password ){

    //  auxiliary variables:
    let validNums = "0123456789"
    let err = 0
    let num = 0

    //  core of the function:

    // has at least 8 characters
    if( password.length < 8 ){
        console.log( "The password has to have a minimum of 8 characters" )
        err += 1
    }

    for( let i = 0; i < password.length; i++ ){
        
        // is it a number?
        if( validNums.includes(password[i]) ){ 
            num += 1 
        }

        // is it a space?
        if( password[i] === " " ){
            console.log( "The password can't contain spaces" )
            err += 1
        }
    }

    if( num < 1 ){ 
        console.log( "The password must contain at least one number from 0 to 9" )
        err += 1 
    }

    if( err >= 1 ){ return false } else { return true }
}