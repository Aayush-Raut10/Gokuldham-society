const Features = () => {
  return (
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Gokuldham Society</h3>
                  <p className="text-xl text-gray-600">Experience the perfect blend of comfort, convenience, and community</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-8 bg-blue-50 rounded-xl hover:shadow-lg transition">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Prime Location</h4>
                      <p className="text-gray-600">Located in the heart of Mumbai with easy access to schools, hospitals, and shopping centers.</p>
                  </div>
                  <div className="p-8 bg-indigo-50 rounded-xl hover:shadow-lg transition">
                      <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Safe & Secure</h4>
                      <p className="text-gray-600">24/7 security surveillance, gated community, and trained security personnel for your peace of mind.</p>
                  </div>
                  <div className="p-8 bg-purple-50 rounded-xl hover:shadow-lg transition">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Vibrant Community</h4>
                      <p className="text-gray-600">Join a diverse and friendly community where neighbors become family.</p>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default Features
