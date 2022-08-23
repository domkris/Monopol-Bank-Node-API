import { User } from '../models/user.model.js'
import logger from '../utils/logger.utils.js'
import bcrypt from 'bcrypt'

export async function createUser (input) {
  try {
    input.password = await hashPassword(input.password)
    return await User.create(input)
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

export async function findUser (query) {
  try {
    return await User.findOne(query, { __v: 0, password: 0 })
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

export async function findAllUsers (query) {
  try {
    return await User.find(query, { __v: 0, password: 0 })
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

export async function updateUser (id, input) {
  try {
    if (input.password) {
      input.password = await hashPassword(input.password)
    }
    return await User.findOneAndUpdate(
      { _id: id },
      { $set: input },
      { new: true }
    )
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

export async function deleteUser (query) {
  try {
    return await User.deleteOne(query)
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

export async function validateUserLogin (email, password) {
  try {
    const user = await User.findOne({ email }).populate('role')
    if (!user) {
      return null
    }
    const isPasswordValid = await user.comparePasswords(user.password, password)
    if (!isPasswordValid) {
      return null
    }
    return user
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

async function hashPassword (plainPassword) {
  try {
    const saltConf = process.env.SALT
    const salt = await bcrypt.genSalt(parseInt(saltConf))
    const hash = bcrypt.hashSync(plainPassword, salt)
    return hash
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}
