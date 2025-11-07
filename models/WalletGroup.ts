
import mongoose from 'mongoose'

export interface WalletGroup extends mongoose.Document {
    mainWalletAddress: string,
    tokenAddress: string,
    generatedWalletsArray: string
}

const WalletGroupSchema = new mongoose.Schema<WalletGroup>({
    mainWalletAddress: {
        type: String,
        required: true
    },
    generatedWalletsArray: {
        type: String,
        required: true
    },
    tokenAddress: {
        type: String,
        required: true
    }
}, { timestamps: true })

let WalletGroup: any;
if (mongoose.models.WalletGroup) {
    WalletGroup = mongoose.model('WalletGroup');
} else {
    WalletGroup = mongoose.model('WalletGroup', WalletGroupSchema);
}

export default WalletGroup;