const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['incomplete', 'complete'],
    default: 'incomplete'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', TaskSchema);
