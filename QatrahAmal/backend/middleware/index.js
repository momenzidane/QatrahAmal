const express = require('express')

module.exports = {
  global:(app) => {
    app.use((req,res,next)=>{
      next();
    })
    app.use(express.json())
    
    app.use(express.urlencoded({extended:false}))
    
  },
//   auth:require('./auth')
}