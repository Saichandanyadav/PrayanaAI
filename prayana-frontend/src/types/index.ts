export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface ItineraryDay {
  day: number;
  activities: string[];
}

export interface BudgetEstimate {
  flights: number;
  accommodation: number;
  food: number;
  activities: number;
  total: number;
}

export interface HotelSuggestion {
  name: string;
  category: string;
  rating: string;
  budgetLevel: string;
  description: string;
}

export interface Trip {
  _id: string;
  destination: string;
  numberOfDays: number;
  budgetType: 'Low' | 'Medium' | 'High';
  interests: string[];
  itinerary: ItineraryDay[];
  budgetEstimate: BudgetEstimate;
  hotels: HotelSuggestion[];
  createdAt: string;
}