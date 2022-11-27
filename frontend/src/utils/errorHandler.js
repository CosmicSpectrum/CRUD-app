export default function errorHandler(err, setIsError, setOpen){
    switch(err.response?.status){
        case 401:
            window.location.href = '/login'
            window.alert('Session token expiered, please login again.')
            break;
        case 400:
            return getBadFields(err.response.data.errors);
        default:
            console.error(err);
            setIsError(true);
            setOpen(true);
    }
}


function getBadFields(errorsArray){
    let problematicParams = [];
    errorsArray.map((error => problematicParams.push(error.param)));
    return problematicParams;

}