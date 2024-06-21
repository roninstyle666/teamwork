import http from './axios'
export const getProduct = (data:{"pageNumber": number,
    "pageSize": number,}) => {
     return http.request({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json;charset=UTF-8',
        },
        url: 'https://f192960197dfe05de74b42bb7099b37d.pty.oscollege.net/product/get-productList',
        method: 'post',
        data: { pageNumber: data.pageNumber,
            pageSize: data.pageSize},
       })
}
export const SearchProduct = (data:{ 
    "pageNumber": number,
    "pageSize": number,
     "id": string,
    "productName": string,
    "store": number,
    "onlineTime": string,
    "offlineTime": string,
    "status": number,
    "createUserId": number,
    "createUsername": string,
    "proxyUserId": number,
    "proxyUsername": string,}) => {
    return http.request({
        
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json;charset=UTF-8',
        },
       url:'https://f192960197dfe05de74b42bb7099b37d.pty.oscollege.net/product/get-productList',
       method: 'post',
      
       data: { 
        pageNumber: 4,
        pageSize: 10,
         id: data.id,
        productName: data.productName,
        store: data.store,
        onlineTime: data.onlineTime,
        offlineTime: data.offlineTime,
        status: data.status,
        createUserId: data.createUserId,
        createUsername: data.createUsername,
        proxyUserId: data.proxyUserId,
        proxyUsername: data.proxyUsername,},
   })
}
export const userout = () => {
    return http.request({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json;charset=UTF-8',
        },
        url: '/user/logout',
        method: 'get',
        data: {     },
    })
}
export const changeStatus= (status:number,ids:string,) => {
    return http.request({
        
        url: 'https://f192960197dfe05de74b42bb7099b37d.pty.oscollege.net/product/update-productStatus',
        method:'put',
        params: { 
            status: status,
            ids: ids},
    })
}

export const addProduct = (data:({
    "productName": string,
    "image": string,
    "price": string,
    "points":string,
    "manner": number,
    "description": string,
    "typeId": number,
    "classId": number,
    "vendorName": string,
    "vendorPhone": string,
    "proxyUserId": number,
    "status": number,
    "launchCity": string,
    "nonDeliveryCity": string,
    "number": number,
    "service_guarantee": string,
    "onlineTime": string,
    "offlineTime": string})) => {
    return http.request({
        url: 'https://f192960197dfe05de74b42bb7099b37d.pty.oscollege.net/product/insert-product',
        method:'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json;charset=UTF-8',
        },
        data: { 
            productName: data.productName,
            image: data.image,
            price: data.price,
            points:data.points,
            manner: data.manner,
            description: data.description,
            typeId: data.typeId,
            classId: data.classId,
            vendorName: data.vendorName,
            vendorPhone: data.vendorPhone,
            proxyUserId: data.proxyUserId,
            status: data.status,
            launchCity: data.launchCity,
            nonDeliveryCity: data.nonDeliveryCity,
            number: data.number,
            service_guarantee: data.service_guarantee,
            onlineTime: data.offlineTime,
            offlineTime: data.offlineTime  
        },
})
}
export const  NumShow= (data:{beginTime:string,endTime:string})=> {
    return http.request(
        {headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json;charset=UTF-8',
        },
            url: 'https://4769edc2b24d4cda00018d4807478bf9.pty.oscollege.net/DataView/NumShow/TimeShow',
            method: 'post',
            data: {beginTime:data.beginTime,endTime:data.endTime},
        })
    
}
export const  TopShow= (data:{beginTime:string,endTime:string})=> {
    return http.request(
        {headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json;charset=UTF-8',
        },
            url: 'https://4769edc2b24d4cda00018d4807478bf9.pty.oscollege.net/DataView/TopShow/TimeShow',
            method: 'post',
            data: {beginTime:data.beginTime,endTime:data.endTime},
        })
    
}
export const  channelShow= (data:{beginTime:string,endTime:string})=> {
    return http.request(
        {headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json;charset=UTF-8',
        },
            url: 'https://4769edc2b24d4cda00018d4807478bf9.pty.oscollege.net/DataView/channelShow/TimeShow',
            method: 'post',
            data:{beginTime:data.beginTime,endTime:data.endTime},
        })
    
}
export const getProductDetail= (data:{"productId":string})=> {
  
        
            
            
}



    
