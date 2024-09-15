import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    const client = await clientPromise
    const db = client.db("med_prognosis")
    
    const user = await db.collection("users").findOne({ email })
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return NextResponse.json({ message: "Sign in successful", token }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}