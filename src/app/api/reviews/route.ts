import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const placeId = req.nextUrl.searchParams.get('placeId')
	const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10)
	const limit = parseInt(req.nextUrl.searchParams.get('limit') || '5', 10)

	if (!placeId) {
		return NextResponse.json({ error: 'Missing placeId' }, { status: 400 })
	}

	try {
		const [reviews, total] = await Promise.all([
			prisma.review.findMany({
				where: { placeId },
				include: { user: true },
				orderBy: { createdAt: 'desc' },
				skip: (page - 1) * limit,
				take: limit,
			}),
			prisma.review.count({ where: { placeId } }),
		])

		return NextResponse.json({ reviews, total })
	} catch (error) {
		console.error('Error fetching reviews:', error)
		return NextResponse.json({ error: 'Internal error' }, { status: 500 })
	}
}
