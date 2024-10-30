const baseUrl =  'http://localhost:3000/api' ;
if(!baseUrl){
    throw new Error ('Api Url is not provided');
}
export default baseUrl;