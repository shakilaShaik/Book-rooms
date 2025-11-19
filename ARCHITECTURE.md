# Workspace Booking & Pricing System - Architecture

## 1. Overview

This system allows users to book meeting rooms by the hour, with dynamic pricing for peak hours, cancellation policies, and admin analytics.  
It is built as a **full-stack app** using:

- **Backend:** Node.js + TypeScript + Express
- **Frontend:** React + React Query + TailwindCSS
- **Data Store:** In-memory (for demo), easily replaceable with SQL/NoSQL
- **Deployment:** Backend on Render/Railway, Frontend on Vercel/Netlify

---

## 2. Data Models

### Room

| Field          | Type   | Description            |
| -------------- | ------ | ---------------------- |
| id             | string | Unique Room ID         |
| name           | string | Room name              |
| baseHourlyRate | number | Base hourly rate (INR) |
| capacity       | number | Maximum people allowed |

### Booking

| Field      | Type   | Description                         |
| ---------- | ------ | ----------------------------------- |
| id         | string | Unique Booking ID                   |
| roomId     | string | Reference to Room                   |
| userName   | string | Name of the person booking          |
| startTime  | string | ISO local datetime of booking start |
| endTime    | string | ISO local datetime of booking end   |
| totalPrice | number | Computed price for the booking      |
| status     | string | CONFIRMED / CANCELLED               |

---

## 3. Backend Logic

### Booking Rules

1. **Time validation**
   - `startTime` < `endTime`
   - Booking duration ≤ 12 hours
   - Booking `startTime` must be **greater than current local time**
2. **Conflict prevention**
   - Overlaps with existing bookings are rejected
3. **Dynamic Pricing**
   - Peak hours (Mon–Fri 10:00–13:00 & 16:00–19:00): `1.5 × baseRate`
   - Off-peak: `baseRate`
   - Price is calculated by computing overlapping peak/off-peak minutes
4. **Cancellation**
   - Allowed only if >2 hours before startTime
   - Updates booking status to `CANCELLED`
   - Cancelled bookings are ignored in analytics

### Analytics

- GET `/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD`
- Returns total hours & total revenue per room for CONFIRMED bookings only
- Example response:

```json
{
  "msg": [
    {
      "roomId": "101",
      "roomName": "Cabin 1",
      "totalHours": 1,
      "totalRevenue": 300
    },
    {
      "roomId": "102",
      "roomName": "Conference A",
      "totalHours": 2.93,
      "totalRevenue": 1960
    }
  ]
}
```
