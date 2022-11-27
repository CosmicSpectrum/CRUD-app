export default function errorHandler(err){
    switch(err.response.status){
        case 401:
            window.location.href = '/login'
            break;
        default:
            console.error(err);
    }
}