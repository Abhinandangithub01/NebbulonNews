import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AdminDB } from '@/lib/db/admins';

// Allow GET requests too for easy browser access
export async function GET() {
  return POST();
}

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await AdminDB.exists();
    
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin already exists' },
        { status: 400 }
      );
    }

    // Create initial admin
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'Admin@123',
      10
    );

    const admin = await AdminDB.create({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL || 'admin@nebbulon.com',
      password: hashedPassword,
      role: 'super_admin',
    });

    return NextResponse.json({
      message: 'Admin created successfully',
      email: admin.email,
    });
  } catch (error) {
    console.error('Admin init error:', error);
    return NextResponse.json(
      { 
        message: 'Failed to create admin',
        error: error instanceof Error ? error.message : 'Unknown error',
        env: {
          hasRegion: !!process.env.NEBBULON_AWS_REGION,
          hasAccessKey: !!process.env.NEBBULON_AWS_ACCESS_KEY_ID,
          hasSecretKey: !!process.env.NEBBULON_AWS_SECRET_ACCESS_KEY,
          hasAdminTable: !!process.env.DYNAMODB_TABLE_ADMINS,
        }
      },
      { status: 500 }
    );
  }
}
