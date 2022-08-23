
import { Role } from '../models/role.model.js'
import logger from '../utils/logger.utils.js'

export async function createRole (input) {
  try {
    return await Role.create(input)
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

export async function findRole (query) {
  try {
    return await Role.findOne(query, { __v: 0 })
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

export async function findAllRoles (query) {
  try {
    return await Role.find(query, { __v: 0 })
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

export async function updateRole (id, input) {
  try {
    return await Role.findOneAndUpdate(
      { _id: id },
      { $set: input },
      { new: true }
    )
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

export async function deleteRole (query) {
  try {
    return await Role.deleteOne(query)
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}
