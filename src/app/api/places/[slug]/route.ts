import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params
		const place = await prisma.place.findUnique({
			where: { slug },
			include: { reviews: true },
		})

		if (!place) {
			return NextResponse.json({ error: 'Không tìm thấy địa điểm' }, { status: 404 })
		}

		return NextResponse.json(place)
	} catch (error) {
		console.error('Error fetching place:', error)
		return NextResponse.json({ error: 'Lỗi khi lấy địa điểm' }, { status: 500 })
	}
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params
		const data = await req.json()

		const updated = await prisma.place.update({
			where: { slug },
			data,
		})

		return NextResponse.json(updated)
	} catch (error) {
		console.error('Error updating place:', error)
		return NextResponse.json({ error: 'Lỗi khi cập nhật địa điểm' }, { status: 500 })
	}
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	try {
		await prisma.place.delete({
			where: { slug },
		})

		return NextResponse.json({ message: 'Đã xóa địa điểm' })
	} catch (error) {
		console.error('Error deleting place:', error)
		return NextResponse.json({ error: 'Lỗi khi xóa địa điểm' }, { status: 500 })
	}
}
