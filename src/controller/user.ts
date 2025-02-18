import { Request, Response } from "express";
import { createUser, login, refreshToken, getUsers } from "../service/user"; 

// Create a new user
export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, ...userData } = req.body;
    await createUser({ email, ...userData });

    return res.status(201).json({ message: "User created successfully", permission: true });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const data = await login({ email, password });

    return res.json(data); 
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

export const refreshTokenController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { token } = req.body;
    const newToken = await refreshToken(token);

    return res.json({ token: newToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const getUsersController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await getUsers(); 
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


