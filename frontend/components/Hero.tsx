const Hero = () => {
    return (
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                            Welcome to<br />
                            <span className="text-blue-600">Gokuldham Society</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            A premium residential community in the heart of Mumbai.
                            Experience modern living with world-class amenities, peaceful surroundings, and a vibrant neighborhood.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg">
                                Resident Portal
                            </button>
                            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                                Explore Amenities
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-blue-600 rounded-2xl h-96 flex items-center justify-center text-white text-2xl">
                            {/* Placeholder for hero image */}
                            <svg className="w-64 h-64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
