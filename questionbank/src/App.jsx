import React, { useState } from 'react';
import { ArrowRight, BookOpen, Calendar, CheckCircle, ChevronLeft, ChevronRight, FileText, Gift, GraduationCap, Instagram, Linkedin, Mail, Phone, Shield, Star, Twitter, Youtube } from 'lucide-react';
import AuthPopup from './components/header/AuthPopup'; // Import the AuthPopup component

const LandingPage = () => {
  // Now using all the variables appropriately
  const [activeExamIndex, setActiveExamIndex] = useState(0);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');



  // Function to open the popup in signup mode
  const openSignupPopup = () => {
    setAuthMode('signup');
    setIsAuthPopupOpen(true);
  };

  // Function to close the popup
  const closeAuthPopup = () => {
    setIsAuthPopupOpen(false);
  };

  const upcomingExams = [
    { id: 1, name: 'GMAT 2025', date: 'May 15, 2025', registrationDate: 'April 10, 2025', icon: <GraduationCap className="h-10 w-10 text-blue-500" /> },
    { id: 2, name: 'GRE Advanced', date: 'June 5, 2025', registrationDate: 'May 1, 2025', icon: <BookOpen className="h-10 w-10 text-purple-500" /> },
    { id: 3, name: 'CAT 2025', date: 'November 28, 2025', registrationDate: 'September 15, 2025', icon: <FileText className="h-10 w-10 text-green-500" /> },
    { id: 4, name: 'UPSC Prelims', date: 'June 18, 2025', registrationDate: 'April 25, 2025', icon: <Shield className="h-10 w-10 text-red-500" /> },
  ];

  const popularExams = [
    { id: 1, name: 'Bank PO', category: 'Banking', students: '50,000+', image: '/api/placeholder/250/150' },
    { id: 2, name: 'SSC CGL', category: 'Government', students: '75,000+', image: '/api/placeholder/250/150' },
    { id: 3, name: 'JEE Mains', category: 'Engineering', students: '120,000+', image: '/api/placeholder/250/150' },
    { id: 4, name: 'NEET', category: 'Medical', students: '90,000+', image: '/api/placeholder/250/150' },
    { id: 5, name: 'GATE', category: 'Engineering', students: '45,000+', image: '/api/placeholder/250/150' },
  ];

  const whyChooseUs = [
    { id: 1, title: 'Expert Faculty', description: 'Learn from educators with years of experience in their respective fields', icon: <GraduationCap className="h-8 w-8 text-blue-500" /> },
    { id: 2, title: 'Comprehensive Question Bank', description: 'Access thousands of practice questions covering all exam topics', icon: <BookOpen className="h-8 w-8 text-blue-500" /> },
    { id: 3, title: 'Personalized Learning', description: 'Adaptive learning technology that focuses on your weak areas', icon: <CheckCircle className="h-8 w-8 text-blue-500" /> },
    { id: 4, title: 'Mock Exams', description: 'Realistic exam simulations to gauge your preparation level', icon: <FileText className="h-8 w-8 text-blue-500" /> },
  ];

  const freeResources = [
    { id: 1, title: 'Exam Pattern Guide', description: 'Downloadable PDF with detailed exam patterns', icon: <FileText className="h-8 w-8 text-purple-500" /> },
    { id: 2, title: 'Weekly Webinars', description: 'Free strategy sessions by top educators', icon: <Calendar className="h-8 w-8 text-purple-500" /> },
    { id: 3, title: 'Daily Quiz', description: 'Test your knowledge with our daily challenge', icon: <Star className="h-8 w-8 text-purple-500" /> },
  ];

  const handlePrevExam = () => {
    setActiveExamIndex((prevIndex) => 
      prevIndex === 0 ? popularExams.length - 1 : prevIndex - 1
    );
  };

  const handleNextExam = () => {
    setActiveExamIndex((prevIndex) => 
      prevIndex === popularExams.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuestionBank
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About Us</a>
            <a href="#exams" className="text-gray-700 hover:text-blue-600 transition">Exams</a>
            <a href="#resources" className="text-gray-700 hover:text-blue-600 transition">Resources</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
          </nav>
          
          <div className="flex space-x-4">
            <button 
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md"
              onClick={openSignupPopup}
            >
              Login / SignUp
            </button>
          </div>
        </div>
      </header>

      {/* Auth Popup */}
      <AuthPopup 
        isOpen={isAuthPopupOpen} 
        onClose={closeAuthPopup} 
        initialMode={authMode} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-100 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Crack Any Exam With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Confidence</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Prepare effectively with our comprehensive question banks, mock tests, and personalized study plans tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-lg text-lg font-semibold flex items-center justify-center"
                onClick={openSignupPopup}
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-lg font-semibold">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="/api/placeholder/600/400" alt="Students preparing for exam" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Our Exam Preparation Platform</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="/api/placeholder/600/400" alt="About QuestionBank" className="rounded-lg shadow-xl" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h3 className="text-2xl font-semibold mb-4">Empowering Students Since 2020</h3>
              <p className="text-gray-700 mb-4">
                QuestionBank was founded with a mission to make quality exam preparation accessible to everyone. Our platform has helped over 500,000 students achieve their academic and career goals.
              </p>
              <p className="text-gray-700 mb-6">
                We believe in a personalized approach to learning, leveraging technology and expert guidance to create an effective preparation strategy for each student.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>500,000+ Students</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>50+ Exams Covered</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>200+ Expert Educators</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>95% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Exams Section */}
      <section id="exams" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Upcoming & Popular Exams</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Stay ahead with our comprehensive preparation resources for all major competitive exams
            </p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-center">Upcoming Exams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:transform hover:scale-105">
                  <div className="flex justify-center mb-4">
                    {exam.icon}
                  </div>
                  <h4 className="text-xl font-bold text-center mb-2">{exam.name}</h4>
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">Exam Date: {exam.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">Registration: {exam.registrationDate}</span>
                  </div>
                  <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Prepare Now
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Popular Exams Slider */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">Popular Exams</h3>
            <div className="relative">
              <div className="flex justify-center items-center">
                <button 
                  onClick={handlePrevExam}
                  className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                  <ChevronLeft className="h-6 w-6 text-blue-600" />
                </button>
                
                <div className="overflow-hidden relative w-full max-w-5xl">
                  <div className="flex justify-center">
                    {popularExams.map((exam, index) => (
                      <div 
                        key={exam.id}
                        className={`w-64 mx-4 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${index === activeExamIndex ? 'scale-105 border-2 border-blue-500' : 'scale-95 opacity-60'}`}
                        style={{transform: `translateX(${(activeExamIndex - index) * 280}px)`}}
                      >
                        <img src={exam.image} alt={exam.name} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <h4 className="text-xl font-bold mb-1">{exam.name}</h4>
                          <p className="text-gray-500 text-sm mb-2">{exam.category}</p>
                          <div className="flex items-center text-sm text-gray-700">
                            <GraduationCap className="h-4 w-4 mr-1" />
                            <span>{exam.students} students</span>
                          </div>
                          <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:opacity-90 transition">
                            Choose Exam
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={handleNextExam}
                  className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                  <ChevronRight className="h-6 w-6 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mock Test Registration */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Register for Free Mock Tests</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Experience real exam conditions and assess your preparation level with our comprehensive mock tests.
          </p>
          <form className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button 
              type="submit" 
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              Register Now
            </button>
          </form>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We offer a comprehensive approach to exam preparation that maximizes your chances of success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{item.title}</h3>
                <p className="text-gray-700 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section id="resources" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Access Free Resources</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Kickstart your preparation with our collection of free study materials and tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {freeResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-center">
                  {resource.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-700 mb-4">{resource.description}</p>
                  <button className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition">
                    Access Now <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md">
              View All Resources
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/60/60" alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Ravi Kumar</h4>
                  <p className="text-sm text-gray-600">Cleared UPSC CSE 2024</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The mock tests were incredibly similar to the actual exam pattern. The detailed analytics helped me identify my weak areas and work on them effectively."
              </p>
              <div className="flex mt-3">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/60/60" alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Priya Singh</h4>
                  <p className="text-sm text-gray-600">Bank PO 2024 Topper</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The question bank is extensive and covers all possible topics. The personalized study plan helped me structure my preparation effectively and manage my time better."
              </p>
              <div className="flex mt-3">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/60/60" alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Anish Mehta</h4>
                  <p className="text-sm text-gray-600">JEE Advanced 2024</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The expert faculty guidance and detailed solution explanations made complex concepts easy to understand. The competitive environment motivated me to push my limits."
              </p>
              <div className="flex mt-3">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Preparation Journey?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students and take the first step toward your dream career.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg text-lg">
              Start 7-Day Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition text-lg">
              View Pricing Plans
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                QuestionBank
              </div>
              <p className="text-gray-400 mb-6">
                Your one-stop solution for comprehensive exam preparation. Access quality study materials and excel in your exams.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#exams" className="text-gray-400 hover:text-white transition">Exams</a></li>
                <li><a href="#resources" className="text-gray-400 hover:text-white transition">Resources</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Exams</h3>
              <ul className="space-y-2">
                {upcomingExams.map((exam) => (
                  <li key={exam.id}>
                    <a href="#" className="text-gray-400 hover:text-white transition">{exam.name}</a>
                  </li>
                ))}
                <li><a href="#" className="text-gray-400 hover:text-white transition">View All</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <span className="text-gray-400">support@questionbank.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <span className="text-gray-400">+91 9876543210</span>
                </li>
                <li>
                  <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded hover:opacity-90 transition">
                    Contact Support
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} QuestionBank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

