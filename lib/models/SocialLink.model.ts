// models/SocialLink.js

import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true }, 
});
const SocialLink = mongoose.models.SocialLink || mongoose.model('SocialLink', socialLinkSchema);
export default SocialLink;
