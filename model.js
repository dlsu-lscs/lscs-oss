
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['message', 'default'],
    required: true
  },
  imagePath: {
    main: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  },
  metadata: {
    uploader: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      username: {
        type: String, required: true
      }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    lastAccessed: { type: Date },
    alt: { type: String },
    owners: [{ type: mongoose.Schema.Types.ObjectId }],
  }
});

// Update updatedAt on every save
imageSchema.pre('save', function(next) {
  this.metadata.updatedAt = Date.now();
  next();
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
