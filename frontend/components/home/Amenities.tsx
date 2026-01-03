const Amenities = () => {

    const amenities = [
        {
            name: "Swimming Pool",
            description: "Olympic-size pool with separate kids area",
            icon: "🏊",
            color: "from-blue-500 to-blue-600"
        },
        {
            name: "Fitness Center",
            description: "State-of-the-art gym with modern equipment",
            icon: "💪",
            color: "from-green-500 to-green-600"
        },
        {
            name: "Clubhouse",
            description: "Spacious hall for events and gatherings",
            icon: "🏛️",
            color: "from-purple-500 to-purple-600"
        },
        {
            name: "Kids Play Area",
            description: "Safe and fun playground for children",
            icon: "🎪",
            color: "from-orange-500 to-orange-600"
        },
        {
            name: "Garden & Yoga",
            description: "Serene gardens with yoga and meditation space",
            icon: "🧘",
            color: "from-pink-500 to-pink-600"
        },
        {
            name: "Sports Courts",
            description: "Tennis, badminton, and basketball courts",
            icon: "🎾",
            color: "from-indigo-500 to-indigo-600"
        },
    ];

    return (
        <section id="amenities" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">Premium Amenities</h3>
                    <p className="text-xl text-gray-600">Experience luxury living with world-class facilities</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {

                        amenities.map((amenity) => (
                            <div key={amenity.name} className={`relative overflow-hidden rounded-xl bg-linear-to-br ${amenity.color} text-white p-8 hover:shadow-2xl transition`}>
                                <h5 className="text-2xl font-semibold mb-3">{amenity.name}</h5>
                                <p className="mb-4">{amenity.description}</p>
                                <div className="text-5xl opacity-20 absolute bottom-4 right-4">{amenity.icon}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Amenities
