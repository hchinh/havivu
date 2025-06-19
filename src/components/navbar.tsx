'use client'

import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="sticky top-0 bg-white z-50 border-b shadow-sm">
			<div className="flex items-center justify-between px-4 py-3">
				{/* LEFT: Logo */}
				<div className="flex items-center gap-4">
					<h1 className="text-xl font-bold">
						<Link href="/">HAVIVU</Link>
					</h1>
				</div>

				{/* CENTER: Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-4 text-sm font-medium">
					{NAV_LINKS.map(({ href, label }) => (
						<Link key={href} href={href} className={linkStyle}>
							{label}
						</Link>
					))}
				</nav>

				{/* RIGHT: Search + Login */}
				<div className="hidden md:flex items-center gap-3">
					<Input type="text" placeholder="Tìm kiếm địa điểm..." className="max-w-sm" />
					<Link href="/login" className="text-sm font-medium whitespace-nowrap hover:underline">
						Đăng nhập
					</Link>
				</div>

				{/* Mobile Toggle Button */}
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					className="md:hidden"
				>
					{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</Button>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden px-4 pb-4">
					<nav className="flex flex-col gap-2 text-sm font-medium">
						{NAV_LINKS.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className={linkStyle}
								onClick={() => setMobileMenuOpen(false)}
							>
								{label}
							</Link>
						))}
					</nav>
					<div className="mt-3">
						<Input type="text" placeholder="Tìm kiếm địa điểm..." />
					</div>
					<div className="mt-2">
						<Link href="/login" className="text-sm font-medium hover:underline">
							Đăng nhập
						</Link>
					</div>
				</div>
			)}
		</header>
	)
}

const NAV_LINKS = [
	{ href: '/', label: 'Trang chủ' },
	{ href: '/category/restaurant', label: 'Ăn uống' },
	{ href: '/category/cafe', label: 'Cà phê' },
	{ href: '/category/hotel', label: 'Khách sạn' },
	{ href: '/category/bar', label: 'Bar' },
	{ href: '/category/sightseeing', label: 'Tham quan' },
	{ href: '/explore', label: 'Khám phá' },
]

const linkStyle = 'text-gray-700 hover:text-black transition-colors'
