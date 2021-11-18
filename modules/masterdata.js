const axios = require('axios');

module.exports = {
    GetMasterData: function () {
        return (GetMasterData());
    }
}
let GetMasterData = function () {
    return new Promise(function (resolve, reject) {    
        
        // III - Store config in environment
        console.log(`Getting random ${process.env.MASTERDATA} master data`)
        axios.request({
            url: "/"
                +process.env.MASTERDATA
                +"?noofRecords=1&idStarts="+Math.floor((Math.random() * 100) + 1),
            method: "GET",
            baseURL: "https://hub.dummyapis.com",
        }).then((res) => {
            if(res.data.message){
                console.log(res.data.message.length + " Master data retrieved")
                resolve(res.data.message)
            }
            resolve(res.data)
        }).catch((err) => {
            console.error(err)
            reject(err)
        });
    })
}