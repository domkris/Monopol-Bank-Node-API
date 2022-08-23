import logger from '../utils/logger.utils.js'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUser,
  updateUser
} from '../services/user.services.js'

dotenvExpand.expand(dotenv.config())

export async function createUserController (req, res) {
  try {
    const result = await createUser(req.body)
    return res.status(200).send(result)
  } catch (error) {
    logger.error(error)
    return res.status(409).send(error.message)
  }
}

export async function getAllUserController (req, res) {
  try {
    const result = await findAllUsers(null)
    return res.status(200).send(result)
  } catch (error) {
    logger.error(error)
    return res.status(500).send(error.message)
  }
}
export async function getByIdUserController (req, res) {
  try {
    const result = await findUser({ _id: req.params.id })
    return res.status(200).send(result)
  } catch (error) {
    logger.error(error)
    return res.status(500).send(error.message)
  }
}
export async function updateUserController (req, res) {
  try {
    const result = await updateUser(req.params.id, req.body)
    return res.status(200).send(result)
  } catch (error) {
    logger.error(error)
    return res.status(500).send(error.message)
  }
}
export async function deleteUserController (req, res) {
  try {
    const result = await deleteUser({ _id: req.params.id })
    return res.status(200).send(result)
  } catch (error) {
    logger.error(error)
    return res.status(500).send(error.message)
  }
}
