'use server'

import { Booking } from '@/database'
import connectDB from '@/lib/mongodb'

export async function createBooking({
	eventId,
	slug,
	email,
}: {
	eventId: string
	slug: string
	email: string
}) {
	try {
		await connectDB()

		await Booking.create({ eventId, slug, email })

		return { success: true }
	} catch (error) {
		console.error('Booking Creation Failed', error)
		return { success: false, error }
	}
}
