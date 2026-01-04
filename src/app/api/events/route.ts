import { Event } from '@/database'
import connectDB from '@/lib/mongodb'
import { v2 as cloudinary } from 'cloudinary'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		await connectDB()

		const data = await request.formData()

		// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
		let event

		try {
			event = Object.fromEntries(data.entries())
		} catch {
			return NextResponse.json(
				{ message: 'Invalid JSON data format' },
				{ status: 400 },
			)
		}

		const file = data.get('image') as File

		if (!file) {
			return NextResponse.json(
				{ message: 'Image file is required' },
				{ status: 400 },
			)
		}

		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{ resource_type: 'image', folder: 'DevEvent' },
					(error, results) => {
						if (error) return reject(error)

						resolve(results)
					},
				)
				.end(buffer)
		})

		event.image = (uploadResult as { secure_url: string }).secure_url

		const createdEvent = await Event.create(event)

		return NextResponse.json(
			{ message: 'Event created successfully', event: createdEvent },
			{ status: 201 },
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{
				message: 'Event Creation Failed',
				error: error instanceof Error ? error.message : 'Unknown',
			},
			{ status: 500 },
		)
	}
}

export async function GET() {
	try {
		await connectDB()

		const events = await Event.find().sort({ createdAt: -1 })

		return NextResponse.json({ message: 'Events fetched successfully', events })
	} catch (error) {
		return NextResponse.json(
			{ message: 'Event fetching failed', error },
			{ status: 500 },
		)
	}
}
