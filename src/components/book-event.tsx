'use client'

import posthog from 'posthog-js'
import { useState } from 'react'
import { createBooking } from './booking.actions'

export function BookEvent({
	eventId,
	slug,
}: {
	eventId: string
	slug: string
}) {
	const [email, setEmail] = useState('')
	const [submitted, setSubmitted] = useState(false)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		const { success, error } = await createBooking({ eventId, slug, email })

		if (success) {
			setSubmitted(true)

			posthog.capture('event_booked', { eventId, slug, email })
		} else {
			console.error('Booking Creation Failed', error)
		}
	}

	return (
		<div id="book-event">
			{submitted ? (
				<p className="text-sm">Thank you for signing up!</p>
			) : (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							id="email"
							placeholder="Enter your emaill address"
						/>
					</div>

					<button type="submit" className="button-submit">
						Submit
					</button>
				</form>
			)}
		</div>
	)
}
