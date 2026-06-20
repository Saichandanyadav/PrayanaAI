import { Schema, model } from 'mongoose';

const TripSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    destination: { type: String, required: true, trim: true },
    numberOfDays: { type: Number, required: true },
    budgetType: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    interests: [{ type: String, required: true }],
    itinerary: [
      {
        day: { type: Number, required: true },
        activities: [{ type: String, required: true }]
      }
    ],
    budgetEstimate: {
      flights: { type: Number, required: true },
      accommodation: { type: Number, required: true },
      food: { type: Number, required: true },
      activities: { type: Number, required: true },
      total: { type: Number, required: true }
    },
    hotels: [
      {
        name: { type: String, required: true },
        category: { type: String, required: true },
        rating: { type: String, required: true },
        budgetLevel: { type: String, required: true },
        description: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export const Trip = model('Trip', TripSchema);