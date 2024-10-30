export const getQueryParams=(data)=>{
    let queryString="";
    const params =Object.keys(data);
    params.map((param)=>{
        if(data[param]) queryString += `&${param}=${data[param]}`
        return queryString
    })
    return queryString
}