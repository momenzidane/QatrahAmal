const donarRouter = require('./donarRouter')
const hospetalRouter = require('./hospetalRouter')

module.exports = (app)=>{
    app.get('/',(req,res,next)=>{
        res.status(200).json({
            status:true,
            message:null
        })
    })
    app.use('/api/donar',donarRouter)
    app.use('/api/hospital',hospetalRouter)
}