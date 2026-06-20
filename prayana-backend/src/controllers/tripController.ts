import { Response } from 'express';
import { CustomRequest } from '../types';
import { Trip } from '../models/Trip';
import { GeminiService } from '../services/geminiService';
import { SYSTEM_TRIP_PROMPT, SYSTEM_DAY_REGEN_PROMPT } from '../utils/prompts';

export const createTrip = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { destination, numberOfDays, budgetType, interests } = req.body;
    if (!destination || !numberOfDays || !budgetType || !interests) {
      res.status(400).json({ error: 'Incomplete parameter profiles provided.' });
      return;
    }

    const cleanUserPrompt = `Build an itinerary for a trip to ${destination} lasting ${numberOfDays} total days. The target consumer operational budget tier is ${budgetType}. The traveler's central interests are focused directly around: ${interests.join(', ')}. Ensure all numbers within the budget estimates are clean integers.`;

    const generatedJsonData = await GeminiService.executeGeneration(SYSTEM_TRIP_PROMPT, cleanUserPrompt);

    const activeTripRecord = await Trip.create({
      userId: req.user?.id,
      destination,
      numberOfDays,
      budgetType,
      interests,
      itinerary: generatedJsonData.itinerary,
      budgetEstimate: generatedJsonData.budgetEstimate,
      hotels: generatedJsonData.hotels
    });

    res.status(201).json(activeTripRecord);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Generation sequence tracking failed.' });
  }
};

export const getUserTrips = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userTripsCollection = await Trip.find({ userId: req.user?.id }).sort({ createdAt: -1 });
    res.json(userTripsCollection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to access database collections.' });
  }
};

export const getTripById = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const isolatedTrip = await Trip.findOne({ _id: req.params.id, userId: req.user?.id });
    if (!isolatedTrip) {
      res.status(404).json({ error: 'Target record resource not found inside your context.' });
      return;
    }
    res.json(isolatedTrip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve record parameters.' });
  }
};

export const updateTrip = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const targetPayloadTrip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!targetPayloadTrip) {
      res.status(404).json({ error: 'Trip resource signature modification target missed.' });
      return;
    }
    res.json(targetPayloadTrip);
  } catch (error) {
    res.status(500).json({ error: 'Database field modification operation exception.' });
  }
};

export const deleteTrip = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const executedStatus = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user?.id });
    if (!executedStatus) {
      res.status(404).json({ error: 'Failed to find targeted object structural deletion map.' });
      return;
    }
    res.json({ success: true, message: 'Resource cleared safely from infrastructure maps.' });
  } catch (error) {
    res.status(500).json({ error: 'Infrastructure transaction fault while wiping target entity.' });
  }
};

export const regenerateTripDay = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { day, specialInstructions } = req.body;
    if (!day) {
      res.status(400).json({ error: 'Target calculation day frame identity parameter is missing.' });
      return;
    }

    const tripInstance = await Trip.findOne({ _id: req.params.id, userId: req.user?.id });
    if (!tripInstance) {
      res.status(404).json({ error: 'Target itinerary framework execution footprint missing.' });
      return;
    }

    const cleanDayRegenPrompt = `
      Modify day number ${day} for our trip to ${tripInstance.destination}. 
      The broader user trip interests profile maps across: ${tripInstance.interests.join(', ')}.
      Special operational instruction adjustment constraint: ${specialInstructions || 'Make the activities more engaging.'}.
    `;

    const refinedDayJsonNode = await GeminiService.executeGeneration(SYSTEM_DAY_REGEN_PROMPT, cleanDayRegenPrompt);

    const itineraryTargetIndex = tripInstance.itinerary.findIndex((item) => item.day === Number(day));
    if (itineraryTargetIndex !== -1) {
      tripInstance.itinerary[itineraryTargetIndex].activities = refinedDayJsonNode.activities;
    } else {
      tripInstance.itinerary.push({ day: Number(day), activities: refinedDayJsonNode.activities });
      tripInstance.itinerary.sort((a, b) => a.day - b.day);
    }

    await tripInstance.save();
    res.json(tripInstance);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Single node modification sequence broken.' });
  }
};

export const addActivity = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { day, activity } = req.body;
    if (!day || !activity) {
      res.status(400).json({ error: 'Missing required day or activity text parameters.' });
      return;
    }
    const tripInstance = await Trip.findOne({ _id: req.params.id, userId: req.user?.id });
    if (!tripInstance) {
      res.status(404).json({ error: 'Target itinerary not found.' });
      return;
    }
    const dayIndex = tripInstance.itinerary.findIndex((item) => item.day === Number(day));
    if (dayIndex !== -1) {
      tripInstance.itinerary[dayIndex].activities.push(activity);
    } else {
      tripInstance.itinerary.push({ day: Number(day), activities: [activity] });
      tripInstance.itinerary.sort((a, b) => a.day - b.day);
    }
    await tripInstance.save();
    res.json(tripInstance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add custom activity record node.' });
  }
};

export const updateActivity = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { day, activityIndex, updatedActivity } = req.body;
    if (!day || activityIndex === undefined || !updatedActivity) {
      res.status(400).json({ error: 'Missing target indices or text node updates.' });
      return;
    }
    const tripInstance = await Trip.findOne({ _id: req.params.id, userId: req.user?.id });
    if (!tripInstance) {
      res.status(404).json({ error: 'Target itinerary not found.' });
      return;
    }
    const dayIndex = tripInstance.itinerary.findIndex((item) => item.day === Number(day));
    if (dayIndex !== -1 && tripInstance.itinerary[dayIndex].activities[activityIndex] !== undefined) {
      tripInstance.itinerary[dayIndex].activities[activityIndex] = updatedActivity;
      tripInstance.markModified('itinerary');
      await tripInstance.save();
      res.json(tripInstance);
    } else {
      res.status(404).json({ error: 'Target day index or activity element location not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to modify activity string parameter node.' });
  }
};

export const deleteActivity = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { day, activityIndex } = req.body;
    if (!day || activityIndex === undefined) {
      res.status(400).json({ error: 'Missing targeting indices parameters.' });
      return;
    }
    const tripInstance = await Trip.findOne({ _id: req.params.id, userId: req.user?.id });
    if (!tripInstance) {
      res.status(404).json({ error: 'Target itinerary not found.' });
      return;
    }
    const dayIndex = tripInstance.itinerary.findIndex((item) => item.day === Number(day));
    if (dayIndex !== -1 && tripInstance.itinerary[dayIndex].activities[activityIndex] !== undefined) {
      tripInstance.itinerary[dayIndex].activities.splice(activityIndex, 1);
      tripInstance.markModified('itinerary');
      await tripInstance.save();
      res.json(tripInstance);
    } else {
      res.status(404).json({ error: 'Target data node coordinates missing inside layout.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to erase activity item array position.' });
  }
};