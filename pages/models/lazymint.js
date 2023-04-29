import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(
  
  "mongodb://127.0.0.1:27017/pinky",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to mongodb')
})

// Create Mongoose schema
const formSchema = new mongoose.Schema({


    address: String,
    mainNftId: String,
    name: String,
    description: String,
    image: String,
    price: String,
    collectionAddress: String,
    tokenID: Number
}
);

// Create Mongoose model
module.exports= mongoose.models.forms || mongoose.model('forms', formSchema)