import express from 'express'
import {
  getAllRolesController,
  getRoleByIdController,
  createRoleController,
  updateRoleController,
  deleteRoleController
} from '../controllers/role.controller.js'
import isUserAuthenticated from '../middlewares/user.middleware.js'

const router = express.Router()

// get all roles
router.get('/', isUserAuthenticated, getAllRolesController)

// get roles by id
router.get('/:id', isUserAuthenticated, getRoleByIdController)

// post - register a new role
router.post('/', isUserAuthenticated, createRoleController)

// patch - update a role
router.patch('/:id', isUserAuthenticated, updateRoleController)

// delete a role
router.delete('/:id', isUserAuthenticated, deleteRoleController)

export { router as roleRouter }
