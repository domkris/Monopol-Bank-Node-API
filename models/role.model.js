import mongoose from 'mongoose'
import { MODELS, ROLES } from '../config/config.js'
const { Schema } = mongoose

const roleDBSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  access: {
    type: String,
    required: true,
    enum: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.BASIC, ROLES.GUEST]
  }
}, { timestamps: true })

const Role = mongoose.model(MODELS.ROLE, roleDBSchema)
export { Role }
