const { response } = require("express");

class Response {
    constructor(status,message){
        this.status=status;
        this.message=message;
        this.date = new Date()
    }
    
}


module.exports=Response