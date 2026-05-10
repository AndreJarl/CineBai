// controllers/feedback.controller.js
import Feedback from '../models/feedback.model.js';
import mongoose from 'mongoose';

export const checkEligibility = async (req, res) => {
    try {
        if (!req.user) return res.json({ canSubmit: true });

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Explicitly convert to ObjectId if needed
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const recentFeedback = await Feedback.findOne({
            userId: userId, // Ensure this matches the field in your Model
            createdAt: { $gte: oneWeekAgo }
        });

        // Debugging: Log this in your terminal
        console.log(`User ${userId} eligibility: ${!recentFeedback}`);

        res.json({ canSubmit: !recentFeedback });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// controllers/feedback.controller.js
export const createFeedback = async (req, res) => {
    try {
        const { rating, summary, details } = req.body;

        // Check eligibility using userId (more reliable than username)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recentFeedback = await Feedback.findOne({
            userId: req.user._id,
            createdAt: { $gte: oneWeekAgo }
        });

        if (recentFeedback) {
            return res.status(403).json({ success: false, message: "Only one submission per week allowed." });
        }

        const newFeedback = new Feedback({
            userId: req.user._id, 
            username: req.user.username, // Store the username here
            rating,
            summary,
            details
        });

        await newFeedback.save();
        res.status(201).json({ success: true, message: "Feedback submitted!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};