import {
  createRole,
  deleteRole,
  findAllRoles,
  findRole,
  updateRole
} from '../services/role.service.js'
import logger from '../utils/logger.utils.js'

export async function createRoleController (req, res) {
  try {
    const role = await createRole(req.body)
    return res.status(200).send(role)
  } catch (error) {
    logger.error(error)
    return res.status(409).send(error.message)
  }
}

export async function getAllRolesController (req, res) {
  try {
    const result = await findAllRoles(null)
    return res.status(200).send(result)
  } catch (error) {
    logger.error(error)
    return res.status(500).send(error.message)
  }
}
export async function getRoleByIdController (req, res) {
  try {
    const result = await findRole({ _id: req.params.id })
    return res.status(200).send(result)
  } catch (error) {
    logger.error(error)
    return res.status(500).send(error.message)
  }
}
export async function updateRoleController (req, res) {
  try {
    const result = await updateRole(req.params.id, req.body)
    return res.status(200).send(result)
  } catch (error) {
    logger.error(error)
    return res.status(500).send(error.message)
  }
}
export async function deleteRoleController (req, res) {
  try {
    const result = await deleteRole({ _id: req.params.id })
    return res.status(200).send(result)
  } catch (error) {
    logger.error(error)
    return res.status(500).send(error.message)
  }
}
