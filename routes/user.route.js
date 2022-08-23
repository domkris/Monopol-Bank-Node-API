import express from 'express'
import {
  getAllUserController,
  getByIdUserController,
  createUserController,
  updateUserController,
  deleteUserController
} from '../controllers/user.controller.js'

const router = express.Router()

// get all users
router.get('/', getAllUserController)

// get user by id
router.get('/:id', getByIdUserController)

// post - register a new user
router.post('/', createUserController)

// patch - update a user
router.patch('/:id', updateUserController)

// delete a user
router.delete('/:id', deleteUserController)

export { router as userRouter }
