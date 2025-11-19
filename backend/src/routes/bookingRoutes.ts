import router from 'express'
import { createBooking } from '../services/createBooking'
import { cancelBooking } from '../services/cancelBooking';
import { getAnalytics } from '../services/analytics';
export const bookingRouter=router()


bookingRouter.post("/bookings",(req,res)=>{
    try {
        
        const result=createBooking(req.body)
        
        res.status(201).json({
  msg: "Your booking was CONFIRMED",
  booking: result
})
    } catch (error:any) {
        res.status(400).json({msg:error.message})
        
    }
})


bookingRouter.get("/bookings/:id/cancel",(req,res)=>{
    try {
        const id=req.params.id
        const result= cancelBooking(id)
        res.json({
            msg:"Your cancellation was successful",room:result})

    } catch (error:any) {
        res.status(400).json({msg:error.message})
        
    }

})

bookingRouter.get("/analytics",(req,res)=>{
    try {
          const fromDate=req.query.from
    const endDate=req.query.to
    const analytics=getAnalytics(fromDate as string, endDate as string)
    res.status(200).json({msg:analytics})

    } catch (error:any) {
        console.log("the error is",error.message );
        res.status(400).json({msg:error.message})
        
    }
  


})