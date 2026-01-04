'use client'

import { useState } from 'react'

export function BookEvent() {
	const [email, setEmail] = useState('')
	const [submitted, setSubmitted] = useState(false)

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		setTimeout(() => {
			setSubmitted(true)
		})
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
