
import mongoose from 'mongoose'

export interface Token extends mongoose.Document {
    mainWalletAddress: string,
    tokenAddress: string,
}

const TokenSchema = new mongoose.Schema<Token>({
    mainWalletAddress: {
        type: String,
        required: true
    },
    tokenAddress: {
        type: String,
        required: true
    }
}, { timestamps: true })

let Token: any;
if (mongoose.models.Token) {
    Token = mongoose.model('Token');
} else {
    Token = mongoose.model('Token', TokenSchema);
}

export default Token;