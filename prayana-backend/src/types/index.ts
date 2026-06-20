import { Request } from 'express';
import { Schema } from 'mongoose';

export interface TokenPayload {
  id: string;
  email: string;
}

export interface CustomRequest extends Request {
  user?: TokenPayload;
}

export interface ITripInput {
  destination: string;
  numberOfDays: number;
  budgetType: 'Low' | 'Medium' | 'High';
  interests: string[];
}

export interface IItineraryDay {
  day: number;
  activities: string[];
}

export interface IBudgetEstimate {
  flights: number;
  accommodation: number;
  food: number;
  activities: number;
  total: number;
}

export interface IHotelSuggestion {
  name: string;
  category: string;
  rating: string;
  budgetLevel: string;
  description: string;
}