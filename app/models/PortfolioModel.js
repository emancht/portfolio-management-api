/// Portfolio Model
import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        img: { type: String }, // Updated comment to match controller
        codelink: { type: String },
        livelink: { type: String },
        createdAt: { type: Date, default: Date.now, },
    },
    { timestamps: true, versionKey: false }
);

const PortfolioModel = mongoose.model('portfolios', PortfolioSchema);

export default PortfolioModel;
