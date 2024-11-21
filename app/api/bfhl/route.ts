import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const backendUrl = process.env.BACKEND_URL || 'https://bhfl-api-hujs.onrender.com'

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error calling backend:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

