import { bookings } from "../data/bookings";

import router from 'express'

 export const adminRouter=router()

adminRouter.get("/bookings", (req, res) => {
  try {
    res.status(200).json({totalBookings:bookings})
  } catch (error:any) {
    res.status(400).json({msg:error.message})
  }
})