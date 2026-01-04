import { notFound } from 'next/navigation'

interface EventDetailsParams {
	params: Promise<{
		slug: string
	}>
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default async function EventDetails({ params }: EventDetailsParams) {
	const { slug } = await params

	const request = await fetch(`${BASE_URL}/api/events/${slug}`)
	const { event } = await request.json()

	if (!event) return notFound()

	return (
		<section id="event">
			<h1>Event Details: {slug}</h1>
		</section>
	)
}
