const Testimonials = () => {

    const testimonials = [
        {
            name: "Jethalal Gada",
            flat: "Flat 101",
            rating: 5,
            comment: "The best decision we made was moving to Gokuldham Society. The management system is incredibly efficient!"
        },
        {
            name: "Daya Ben",
            flat: "Flat 102",
            rating: 5,
            comment: "Amazing amenities and wonderful community. The online platform makes everything so convenient."
        },
        {
            name: "Taarak Mehta",
            flat: "Flat 201",
            rating: 5,
            comment: "Safe environment for kids with excellent facilities. Couldn't ask for a better place to live!"
        }
    ]

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">What Residents Say</h3>
                    <p className="text-xl text-gray-600">Hear from our happy community members</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {
                        testimonials.map((testimonial) => (
                            <div key={testimonial.name} className="bg-white p-8 rounded-xl shadow-md">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                                <div className="font-semibold">{testimonial.name}</div>
                                <div className="text-sm text-gray-500">{testimonial.flat}</div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default Testimonials
