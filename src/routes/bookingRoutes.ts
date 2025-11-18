import router from 'express'
import { createBooking } from '../services/createBooking'
export const bookingRouter=router()


bookingRouter.post("/book",(req,res)=>{
    try {
        console.log("the data coming from api request",req.body);
        const result=createBooking(req.body)

        res.json(`msg: Your booking was CONFIRMED${result}`)
    } catch (error) {
        res.json(`msg:your booking was not confirmed ${error}`)
        
    }
})