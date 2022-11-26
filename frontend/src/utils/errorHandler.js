

export default function errorHandler(err){
    switch(err.response.status){
        case 401:
            break;
        default:
            console.error(err);
    }
}