import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ReactQueryProvider } from '@/hooks/providers'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Havivu - Travel Guide',
	keywords: ['travel', 'guide', 'places', 'explore', 'vacation'],
	description: 'Explore the world with Havivu, your ultimate travel guide.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
			>
				<Navbar />
				<main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
					<ReactQueryProvider>{children}</ReactQueryProvider>
				</main>
				<Footer />
			</body>
		</html>
	)
}
