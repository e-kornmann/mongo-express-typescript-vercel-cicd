import Router from 'express';
import { saveUser, getUser } from '../handlers';
import { User } from 'types';

const users = Router();

users.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const userData = await getUser(userId);
  res.json(userData);
});

users.post('/', async (req, res) => {
  const insertUser: User  = req.body;
  const user = await saveUser(insertUser);
  res.json(user);
});

export default users;