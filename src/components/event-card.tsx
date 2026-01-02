import Image from 'next/image'
import Link from 'next/link'

interface EventCardProps {
	slug: string
	title: string
	image: string
	location: string
	date: string
	time: string
}

export default function EventCard({
	slug,
	title,
	image,
	location,
	date,
	time,
}: EventCardProps) {
	return (
		<Link href={slug} id="event-card">
			<Image
				src={image}
				alt={title}
				width={410}
				height={300}
				className="poster"
			/>
			<p className="title">{title}</p>
		</Link>
	)
}
