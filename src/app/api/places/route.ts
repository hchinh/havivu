import { prisma } from '@/lib/prisma'
import { Place } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams
		const category = searchParams.get('category')
		const q = searchParams.get('q')?.toLowerCase()
		const minRating = parseFloat(searchParams.get('minRating') || '0')
		const sort = searchParams.get('sort') // e.g., 'latest' or 'rating'

		const places = await prisma.place.findMany({
			where: {
				...(category && { category: category.toLowerCase() }),
				...(q && {
					OR: [
						{ name: { contains: q, mode: 'insensitive' } },
						{ description: { contains: q, mode: 'insensitive' } },
					],
				}),
			},
			include: { reviews: true },
			orderBy:
				sort === 'rating'
					? undefined // Will sort manually after calculating avg
					: { createdAt: 'desc' },
		})

		// Format rating
		const formatted = places
			.map((place: Place) => {
				const total = place.reviews ? place.reviews.reduce((acc, r) => acc + r.rating, 0) : 0
				const avg = place.reviews
					? place.reviews.length > 0
						? total / place.reviews.length
						: 0
					: 0
				return {
					...place,
					rating: +avg.toFixed(1),
					reviewCount: place.reviews ? place.reviews.length : 0,
				}
			})
			.filter((place: Place) => place.rating >= minRating)

		// Sort by rating if needed
		if (sort === 'rating') {
			formatted.sort((a: Place, b: Place) => b.rating - a.rating)
		}

		if (formatted.length === 0) {
			return NextResponse.json({ message: 'Không tìm thấy địa điểm nào' }, { status: 404 })
		}

		return NextResponse.json(formatted)
	} catch (error) {
		console.error('Error fetching places:', error)
		return NextResponse.json({ error: 'Lỗi khi lấy danh sách địa điểm' }, { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const data = await req.json()

		const place = await prisma.place.create({
			data: {
				name: data.name,
				slug: data.slug,
				description: data.description,
				category: data.category,
				address: data.address,
				latitude: data.latitude,
				longitude: data.longitude,
				openingHours: data.openingHours,
				phone: data.phone,
				website: data.website,
				images: data.images,
			},
		})

		return NextResponse.json(place, { status: 201 })
	} catch (error) {
		console.error('Error creating place:', error)
		return NextResponse.json({ error: 'Lỗi khi tạo địa điểm' }, { status: 500 })
	}
}
