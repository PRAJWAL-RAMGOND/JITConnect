import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['general', 'internship', 'placement', 'research', 'event'],
    default: 'general'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: { type: Date, default: Date.now }
  }],
  isApproved: {
    type: Boolean,
    default: true
  },
  isRestricted: {
    type: Boolean,
    default: false
  },
  restrictionReason: {
    type: String,
    default: ''
  },
  restrictedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;
