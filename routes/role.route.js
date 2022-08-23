import express from 'express'
import {
  getAllRolesController,
  getRoleByIdController,
  createRoleController,
  updateRoleController,
  deleteRoleController
} from '../controllers/role.controller.js'

const router = express.Router()

// get all roles
router.get('/', getAllRolesController)

// get roles by id
router.get('/:id', getRoleByIdController)

// post - register a new role
router.post('/', createRoleController)

// patch - update a role
router.patch('/:id', updateRoleController)

// delete a role
router.delete('/:id', deleteRoleController)

export { router as roleRouter }
