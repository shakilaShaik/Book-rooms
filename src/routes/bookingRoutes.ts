import router from 'express'
import { createBooking } from '../services/createBooking'
import { cancelBooking } from '../services/cancelBooking';
export const bookingRouter=router()


bookingRouter.post("/book",(req,res)=>{
    try {
        console.log("the data coming from api request",req.body);
        const result=createBooking(req.body)
        console.log("the object returned from booking", result);

        res.json({
  msg: "Your booking was CONFIRMED",
  booking: result
})
    } catch (error) {
        res.json(`msg:your booking was not confirmed ${error}`)
        
    }
})


bookingRouter.post("/:id/cancel",(req,res)=>{
    try {
        const id=req.params.id
        const result= cancelBooking(id)
        res.json({
            msg:"Your cancellation was successful"

        })

    } catch (error) {
        res.json(error)
        
    }

})