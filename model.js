import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['message', 'default'],
    required: true
  },
  image: { type: String, required: true },
  thumbnail: { type: String, required: true },
  metadata: {
    uploader: {
      id: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true
      }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    lastAccessed: { type: Date },
    alt: { type: String },
    owners: [String]
  }
});

// Update `updatedAt` on every save
imageSchema.pre('save', function(next) {
  this.metadata.updatedAt = Date.now();
  next();
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
