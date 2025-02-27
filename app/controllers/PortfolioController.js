import mongoose from 'mongoose';
import PortfolioModel from "../models/PortfolioModel.js";

// Create or Update Portfolio
export const savePortfolio = async (req, res) => {
    try {
        let { portfolioID } = req.params;
        const { title, description, codelink, livelink } = req.body;


        if (portfolioID) {
            portfolioID = portfolioID.trim();
        }

        // Validate required fields
        if (!title || !description || !codelink || !livelink) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const img = req.file ? req.file.filename : null; // Handle uploaded image

        if (portfolioID) {
            // Check if the portfolioID is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(portfolioID)) {
                return res.status(400).json({ status: "fail", message: "Invalid portfolioID" });
            }

            // Update existing Portfolio
            const updates = { title, description, codelink, livelink };
            if (img) updates.img = img; // Only update image if provided

            const updatedPortfolio = await PortfolioModel.findByIdAndUpdate(portfolioID, updates, {
                new: true,
            });

            if (!updatedPortfolio) {
                return res.status(404).json({ status: "fail", message: "Portfolio not found" });
            }

            return res
                .status(200)
                .json({ status: "success", message: "Portfolio updated successfully", data: updatedPortfolio });
        } else {
            // Create a new Portfolio
            const newPortfolio = new PortfolioModel({ title, description, codelink, livelink, img });
            await newPortfolio.save();

            return res
                .status(201)
                .json({ status: "success", message: "Portfolio created successfully", data: newPortfolio });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error processing portfolio", error: error.message });
    }
};


// Get a specific Portfolio post
export const getPortfolio = async (req, res) => {
    try {
        const portfolio = await PortfolioModel.findById(req.params.portfolioID);
        if (!portfolio) {
            return res.status(404).json({ status: "fail", message: "Portfolio not found" });
        }
        res.status(200).json({ status: "success", data: portfolio });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error fetching portfolio", error: error.message });
    }
};

// Delete a portfolio
export const removePortfolio = async (req, res) => {
    try {
        const deletedPortfolio = await PortfolioModel.findByIdAndDelete(req.params.portfolioID);

        if (!deletedPortfolio) {
            return res.status(404).json({ status: "fail", message: "Portfolio not found" });
        }
        res.status(200).json({ status: "success", message: "Portfolio deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error deleting portfolio", error: error.message });
    }
};

// List all portfolios
export const portfolioList = async (req, res) => {
    try {
        const portfolios = await PortfolioModel.find().sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({
            status: "success",
            data: portfolios,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching portfolios",
            error: error.message,
        });
    }
};
