'use client'

import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function Navbar() {
	return (
		<header className="flex items-center justify-between px-4 py-3 border-b shadow-sm sticky top-0 bg-white z-50">
			{/* LEFT: Logo + Navigation */}
			<div className="flex items-center gap-6">
				<h1 className="text-xl font-bold">
					<Link href="/">HAVIVU</Link>
				</h1>
				<nav className="hidden md:flex items-center gap-4 text-sm font-medium">
					<Link href="/" className={linkStyle}>
						Trang chủ
					</Link>
					<Link href="/category/restaurant" className={linkStyle}>
						Ăn uống
					</Link>
					<Link href="/category/cafe" className={linkStyle}>
						Cà phê
					</Link>
					<Link href="/category/hotel" className={linkStyle}>
						Khách sạn
					</Link>
					<Link href="/category/bar" className={linkStyle}>
						Bar
					</Link>
					<Link href="/category/sightseeing" className={linkStyle}>
						Tham quan
					</Link>
					<Link href="/explore" className={linkStyle}>
						Khám phá
					</Link>
				</nav>
			</div>

			{/* RIGHT: Search + Login */}
			<div className="flex items-center gap-3">
				<Input type="text" placeholder="Tìm kiếm địa điểm..." className="max-w-sm" />
				<Link href="/login" className="text-sm font-medium whitespace-nowrap hover:underline">
					Đăng nhập
				</Link>
			</div>
		</header>
	)
}

const linkStyle = 'text-gray-700 hover:text-black transition-colors'
