// models/About.ts
import { Schema, model, models } from 'mongoose';

const aboutSchema = new Schema({
  
  id: {
    type: String,
    default:"1",
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  details: {
    type: String,
    required: [true, 'details is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const About = models.About || model('About', aboutSchema);

export default About;
