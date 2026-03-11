import express from 'express';
import Post from '../models/Post.js';
import Job from '../models/Job.js';
import Research from '../models/Research.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/moderation/posts
// @desc    Get all posts for moderation
// @access  Private/Admin
router.get('/posts', protect, adminOnly, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/moderation/posts/:id/approve
// @desc    Approve a post
// @access  Private/Admin
router.put('/posts/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    post.isApproved = true;
    post.isRestricted = false;
    post.restrictionReason = '';
    await post.save();
    
    res.json({ message: 'Post approved', post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/moderation/posts/:id/restrict
// @desc    Restrict a post
// @access  Private/Admin
router.put('/posts/:id/restrict', protect, adminOnly, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    post.isApproved = false;
    post.isRestricted = true;
    post.restrictionReason = req.body.reason || 'Violates community guidelines';
    post.restrictedBy = req.user._id;
    await post.save();
    
    res.json({ message: 'Post restricted', post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/moderation/posts/:id
// @desc    Delete a post
// @access  Private/Admin
router.delete('/posts/:id', protect, adminOnly, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/moderation/jobs
// @desc    Get all jobs for moderation
// @access  Private/Admin
router.get('/jobs', protect, adminOnly, async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name email role')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/moderation/jobs/:id/approve
// @desc    Approve a job
// @access  Private/Admin
router.put('/jobs/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    job.isApproved = true;
    await job.save();
    
    res.json({ message: 'Job approved', job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/moderation/jobs/:id/restrict
// @desc    Restrict a job
// @access  Private/Admin
router.put('/jobs/:id/restrict', protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    job.isApproved = false;
    await job.save();
    
    res.json({ message: 'Job restricted', job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/moderation/jobs/:id
// @desc    Delete a job
// @access  Private/Admin
router.delete('/jobs/:id', protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/moderation/research
// @desc    Get all research for moderation
// @access  Private/Admin
router.get('/research', protect, adminOnly, async (req, res) => {
  try {
    const research = await Research.find()
      .populate('facultyMember', 'name email department')
      .sort({ createdAt: -1 });
    res.json(research);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/moderation/research/:id/approve
// @desc    Approve research
// @access  Private/Admin
router.put('/research/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).json({ message: 'Research not found' });
    
    research.isApproved = true;
    await research.save();
    
    res.json({ message: 'Research approved', research });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/moderation/research/:id/restrict
// @desc    Restrict research
// @access  Private/Admin
router.put('/research/:id/restrict', protect, adminOnly, async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).json({ message: 'Research not found' });
    
    research.isApproved = false;
    await research.save();
    
    res.json({ message: 'Research restricted', research });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/moderation/research/:id
// @desc    Delete research
// @access  Private/Admin
router.delete('/research/:id', protect, adminOnly, async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).json({ message: 'Research not found' });
    
    await research.deleteOne();
    res.json({ message: 'Research deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/moderation/events
// @desc    Get all events for moderation
// @access  Private/Admin
router.get('/events', protect, adminOnly, async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1, createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/moderation/events/:id/approve
// @desc    Approve an event
// @access  Private/Admin
router.put('/events/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    event.isApproved = true;
    await event.save();
    
    res.json({ message: 'Event approved', event });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/moderation/events/:id/restrict
// @desc    Restrict an event
// @access  Private/Admin
router.put('/events/:id/restrict', protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    event.isApproved = false;
    await event.save();
    
    res.json({ message: 'Event restricted', event });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/moderation/events/:id
// @desc    Delete an event
// @access  Private/Admin
router.delete('/events/:id', protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
