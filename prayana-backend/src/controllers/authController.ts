import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { CustomRequest } from '../types';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: 'All fields are strictly required.' });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ error: 'An account with this email already exists.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });

    const secret = process.env.JWT_SECRET || 'fallback_super_secret_key_string';
    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Internal system fault executing registration sequence.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password combination.' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ error: 'Invalid email or password combination.' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'fallback_super_secret_key_string';
    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server failure handling authentication.' });
  }
};

export const getMe = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User identity could not be verified.' });
      return;
    }
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Failed to recover profile mapping context.' });
  }
};