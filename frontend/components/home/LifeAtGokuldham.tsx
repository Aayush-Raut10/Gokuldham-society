const LifeAtGokuldham = () => {

    const life = [
        {
            title: "Vibrant Community",
            description: "Regular events, festivals, and gatherings bring neighbors together as one big family",
            svg: (<svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2
            2 0 11-4 0 2 2 0 014 0z" />
            </svg>)
        },
        {
            title: "Green Spaces",
            description: "Beautifully landscaped gardens and parks for morning walks and peaceful evenings",
            svg: (<svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>)
        },
        {
            title: "Family Friendly",
            description: "Safe environment with dedicated play areas and activities for children of all ages",
            svg: (<svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>)
        },
        {
            title: "24/7 Security",
            description: "Gated community with CCTV surveillance and trained security personnel round the clock",
            svg: (<svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>)
        },
        {
            title: "Prime Location",
            description: "Close to schools, hospitals, malls, and transportation hubs for ultimate convenience",
            svg: (<svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>)
        },
        {
            title: "Modern Living",
            description: "24x7 power backup, water supply, and waste management for uninterrupted comfort",
            svg: (<svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>)
        }
    ]

    return (
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">Life at Gokuldham</h3>
                    <p className="text-xl text-gray-600">Discover what makes our community special</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        life.map((item) => (
                            <div key={item.title} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    {item.svg}
                                </div>
                                <h5 className="font-semibold text-xl mb-3">
                                    {item.title}
                                </h5>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default LifeAtGokuldham
