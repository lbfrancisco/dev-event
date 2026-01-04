import { EventCard } from '@/components/event-card'
import { ExploreButton } from '@/components/explore-button'
import type { IEvent } from '@/database'
import { cacheTag } from 'next/cache'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default async function Home() {
	'use cache'
	cacheTag('events-data')

	const response = await fetch(`${BASE_URL}/api/events`)

	const { events } = await response.json()

	return (
		<section>
			<h1 className="text-center">
				The Hub for Every Dev <br /> Event You Can't Miss
			</h1>
			<p className="text-center mt-5">
				Hackthons, Meetups, and Conferences, All in One Place
			</p>

			<ExploreButton />

			<div className="mt-20 space-y-7">
				<h3>Featured Events</h3>

				<ul className="events">
					{events &&
						events.length > 0 &&
						events.map((event: IEvent) => (
							<li key={event.slug}>
								<EventCard {...event} />
							</li>
						))}
				</ul>
			</div>
		</section>
	)
}
