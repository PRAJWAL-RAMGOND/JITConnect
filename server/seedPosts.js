import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/Post.js';
import User from './models/User.js';

dotenv.config();

const seedPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get some users to create posts
    const students = await User.find({ role: 'student' }).limit(3);
    const faculty = await User.find({ role: 'faculty' }).limit(2);
    const alumni = await User.find({ role: 'alumni' }).limit(2);

    const posts = [
      {
        content: 'Just completed my internship at Google! 🎉 Great learning experience and met some amazing people.',
        category: 'placement',
        user: students[0]?._id,
        isApproved: true
      },
      {
        content: 'Participated in the national hackathon and won 2nd place! 🏆 Thanks to my team and faculty mentor.',
        category: 'event',
        user: students[1]?._id,
        isApproved: true
      },
      {
        content: 'Looking for research opportunities in AI/ML. If anyone has projects available, please reach out!',
        category: 'research',
        user: students[2]?._id,
        isApproved: true
      },
      {
        content: 'I am looking for 3-4 students to work on a research project related to IoT and smart cities. Interested students can contact me.',
        category: 'research',
        user: faculty[0]?._id,
        isApproved: true
      },
      {
        content: 'New internship opportunities available at TechCorp! Full-time position for final year students. Apply now!',
        category: 'internship',
        user: alumni[0]?._id,
        isApproved: true
      },
      {
        content: 'JIT Connect is now live! 🚀 Connect with alumni, find internships, and stay updated with college events.',
        category: 'general',
        user: students[0]?._id,
        isApproved: true
      },
      {
        content: 'TechFest 2024 registration is open! Don\'t miss out on the biggest tech festival in the region.',
        category: 'event',
        user: faculty[1]?._id,
        isApproved: true
      },
      {
        content: 'Placement season is approaching! Start preparing your resumes and practice coding interviews.',
        category: 'placement',
        user: alumni[1]?._id,
        isApproved: true
      }
    ];

    const validPosts = posts.filter(post => post.user);
    const createdPosts = await Post.insertMany(validPosts);
    console.log(`✅ Created ${createdPosts.length} posts`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedPosts();
