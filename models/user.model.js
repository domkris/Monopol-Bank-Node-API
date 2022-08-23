import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { MODELS, USERNAME, PASSWORD, REGEX } from '../config/config.js'
import idvalidator from 'mongoose-id-validator'

const { Schema } = mongoose

const userDBSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: USERNAME.MIN_LENGTH,
    maxlength: USERNAME.MAX_LENGTH
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: REGEX.EMAIL_VALID_MATCH
  },
  password: {
    type: String,
    required: true,
    minlength: PASSWORD.MIN_LENGTH
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: MODELS.ROLE,
    required: true
  }

}, { timestamps: true })

// Functionality for user loggin
userDBSchema.methods.comparePasswords = async (
  dbPassword,
  clientProvidedPassword) => {
  return bcrypt.compare(clientProvidedPassword, dbPassword)
}

userDBSchema.plugin(idvalidator)
const User = mongoose.model(MODELS.USER, userDBSchema)
export { User }
