const getErrorMessage = (err) => {
    let message = '';
    if (err.code) {
        switch(err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;

            default: 
                message = 'Something went wrong IDK what the hell is going on any more'
        }
    } else if (err.errors) {
        for (let errName in err.errors) {
            let errorObj = err.errors[errName];
            if (errorObj && errorObj.properties && errorObj.properties.message) {
                message = errorObj.properties.message
            } else if (err.errors[errName].message) {
                message = err.errors[errName].messages
            }
        }
    } else if (err._message) {
        message = err._message;
    }
    else {
            message = err;
    }
    return message;
}

const getUniqueErrorMessage = (err) => {
    let output;
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));
        output = filedName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
    } catch(ex) {
        output = 'Unique field already exists'
    }
    return output;
}
export default {getErrorMessage, getUniqueErrorMessage}