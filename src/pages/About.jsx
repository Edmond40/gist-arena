import React from 'react';

const teamMembers = [
  {
    name: 'Sandy Lee',
    role: 'Founder & Editor-in-Chief',
    bio: 'With over 15 years of experience in journalism, Sandy leads our editorial team with a passion for truth and compelling storytelling.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    emoji: '👩‍💼'
  },
  {
    name: 'Alex Kim',
    role: 'Lead Developer',
    bio: 'Tech enthusiast and problem solver, Alex ensures our platform delivers news with speed, reliability, and an exceptional user experience.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    emoji: '👨‍💻'
  },
  {
    name: 'Priya Singh',
    role: 'Senior Correspondent',
    bio: 'Award-winning journalist with a keen eye for detail, Priya brings important stories to light with integrity and depth.',
    image: 'https://images.unsplash.com/photo-1573496358961-3c23ee2bc5d9?w=400&auto=format&fit=crop&q=80',
    emoji: '📰'
  },
  {
    name: 'Marcus Chen',
    role: 'Visual Editor',
    bio: 'Creative director and visual storyteller, Marcus ensures our content is as visually compelling as it is informative.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    emoji: '🎨'
  }
];

const milestones = [
  {
    year: '2023',
    title: 'Founded',
    description: 'Launched with a mission to deliver accurate, timely news with a fresh perspective.',
    icon: '🚀'
  },
  {
    year: '2024',
    title: 'Global Reach',
    description: 'Expanded our team and coverage to include international correspondents in over 20 countries.',
    icon: '🌍'
  },
  {
    year: '2025',
    title: 'Community Focus',
    description: 'Launched community features and interactive content to engage with our readers like never before.',
    icon: '🤝'
  },
  {
    year: '2025',
    title: 'Award Winning',
    description: 'Recognized with the Excellence in Journalism Award for our groundbreaking investigative series.',
    icon: '🏆'
  }
];

const values = [
  {
    title: 'Integrity',
    description: 'We are committed to the highest standards of journalistic integrity and ethics.',
    icon: '🔍'
  },
  {
    title: 'Innovation',
    description: 'We embrace new technologies and storytelling methods to better serve our readers.',
    icon: '💡'
  },
  {
    title: 'Inclusivity',
    description: 'We believe in representing diverse voices and perspectives in our reporting.',
    icon: '🌐'
  },
  {
    title: 'Impact',
    description: 'We aim to create meaningful change through our investigative journalism.',
    icon: '✨'
  }
];

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">About</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">
              Sandy's Updates
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            Delivering accurate, timely, and impactful news with a commitment to truth and excellence in journalism.
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2023, Sandy's Updates has quickly become a trusted source for millions of readers worldwide. 
              Our team of dedicated journalists and technologists work together to bring you the stories that matter most.
            </p>
            <p className="text-lg text-gray-700">
              We believe in the power of information to inspire change and connect communities. Our mission is to deliver 
              news that is not only informative but also engaging and accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hover:border-yellow-200"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-200 transform -translate-x-1/2"></div>
            
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative mb-12 md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`md:w-5/12 px-4 md:px-8 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="md:hidden w-16 h-1 bg-yellow-300 mb-4"></div>
                  <div className="inline-block bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
                
                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 border-4 border-yellow-300 mx-auto z-10">
                  <span className="text-2xl">{milestone.icon}</span>
                </div>
                
                {/* Empty div for spacing on the other side */}
                <div className="hidden md:block md:w-5/12 px-8"></div>
                
                {/* Mobile dot */}
                <div className="md:hidden w-10 h-10 rounded-full bg-yellow-100 border-4 border-yellow-300 flex items-center justify-center mx-auto my-6">
                  <span className="text-lg">{milestone.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to bringing you the most important stories
            </p>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-yellow-300 font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    {['twitter', 'linkedin', 'mail'].map((social) => (
                      <a 
                        key={social}
                        href={`#${social}`} 
                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                        aria-label={`${member.name}'s ${social}`}
                      >
                        <span className="sr-only">{social}</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We're always looking for talented individuals who share our passion for journalism and technology.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-full transition-colors shadow-md hover:shadow-lg">
              View Open Positions
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-yellow-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated With Our Newsletter</h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Get the latest news and updates delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-3 px-8 rounded-full transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
