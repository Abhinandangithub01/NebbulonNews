import { v4 as uuidv4 } from 'uuid';
import dynamoDB, { TABLES } from '../dynamodb';
import { Admin } from '@/types';

export const AdminDB = {
  // Create new admin
  create: async (data: Omit<Admin, '_id' | 'createdAt'>): Promise<Admin> => {
    const admin: Admin = {
      _id: uuidv4(),
      ...data,
      createdAt: new Date() as any,
    };

    await dynamoDB.put(TABLES.ADMINS, admin);
    return admin;
  },

  // Get admin by email
  getByEmail: async (email: string): Promise<Admin | null> => {
    const items = await dynamoDB.scan(TABLES.ADMINS, {
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email.toLowerCase(),
      },
    });
    return items[0] as Admin | null;
  },

  // Get admin by ID
  getById: async (id: string): Promise<Admin | null> => {
    const admin = await dynamoDB.get(TABLES.ADMINS, { _id: id });
    return admin as Admin | null;
  },

  // Check if any admin exists
  exists: async (): Promise<boolean> => {
    const items = await dynamoDB.scan(TABLES.ADMINS, {
      Limit: 1,
    });
    return items.length > 0;
  },
};
