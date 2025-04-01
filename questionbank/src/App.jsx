import React, { useState } from 'react';
import { ArrowRight, BookOpen, Calendar, CheckCircle, ChevronLeft, ChevronRight, FileText, Gift, GraduationCap, Instagram, Linkedin, Mail, Menu, Phone, Shield, Star, Twitter, X, Youtube } from 'lucide-react';
import AuthPopup from './components/AuthPopup'; // Import the AuthPopup component

const LandingPage = () => {
  // State variables
  const [activeExamIndex, setActiveExamIndex] = useState(0);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to open the popup in signup mode
  const openSignupPopup = () => {
    setAuthMode('signup');
    setIsAuthPopupOpen(true);
  };

  // Function to close the popup
  const closeAuthPopup = () => {
    setIsAuthPopupOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuestionBank
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About Us</a>
            <a href="#exams" className="text-gray-700 hover:text-blue-600 transition">Exams</a>
            <a href="#resources" className="text-gray-700 hover:text-blue-600 transition">Resources</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 focus:outline-none"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          
          {/* Login/Signup Button - Desktop */}
          <div className="hidden md:block">
            <button 
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md"
              onClick={openSignupPopup}
            >
              Login / SignUp
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4 shadow-lg">
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition py-1">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition py-1">About Us</a>
              <a href="#exams" className="text-gray-700 hover:text-blue-600 transition py-1">Exams</a>
              <a href="#resources" className="text-gray-700 hover:text-blue-600 transition py-1">Resources</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition py-1">Contact</a>
              <button 
                className="w-full px-4 py-2 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md"
                onClick={openSignupPopup}
              >
                Login / SignUp
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Popup */}
      <AuthPopup 
        isOpen={isAuthPopupOpen} 
        onClose={closeAuthPopup} 
        initialMode={authMode} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-100 py-10 sm:py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Crack Any Exam With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Confidence</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-8">
              Prepare effectively with our comprehensive question banks, mock tests, and personalized study plans tailored to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <button 
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-lg text-base sm:text-lg font-semibold flex items-center justify-center"
                onClick={openSignupPopup}
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-6 sm:px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-base sm:text-lg font-semibold">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="https://media-hosting.imagekit.io/f944ca46cce04ae3/grades-concept-illustration.png?Expires=1838110336&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=YHi~cbUmndFKRqes0Iqgum0FdNylgVIYCT90MADbEH8L6WSeT5hCvAJTWVsVfpeS4xYaPEZFoXQqZRW7qsle~7x4-CA-J1XgZ9PRel4y9SpTW6P6oXOpHvUmRscXDau136qRSxqbdElCGPc6u0YOnpmysTtUnMttVyvOjJxK~zdcesYkj6bh44o~Db~1ImMZUqFZKldBk84zoCPplNKMU52iwzXyIKT5wRcgQOzgAcKdM6nswpDgfpdcRjaLOvSrrqD1927skNZ2h2FBPd2Em6tYTIrQn1fCk~dfYwMm~A8O~PQ2n7DzdQ91STc1VodEKG8m~A7Mt06ssdrN73KgYA__" alt="Students preparing for exam" className="rounded-lg shadow-2xl w-full h-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Our Exam Preparation Platform</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="/api/placeholder/600/400" alt="About QuestionBank" className="rounded-lg shadow-xl w-full h-auto" />
            </div>
            <div className="md:w-1/2 md:pl-8 lg:pl-12">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Empowering Students Since 2020</h3>
              <p className="text-gray-700 mb-4">
                QuestionBank was founded with a mission to make quality exam preparation accessible to everyone. Our platform has helped over 500,000 students achieve their academic and career goals.
              </p>
              <p className="text-gray-700 mb-6">
                We believe in a personalized approach to learning, leveraging technology and expert guidance to create an effective preparation strategy for each student.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>500,000+ Students</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>50+ Exams Covered</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>200+ Expert Educators</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>95% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Exams Section */}
      <section id="exams" className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Explore Upcoming & Popular Exams</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Stay ahead with our comprehensive preparation resources for all major competitive exams
            </p>
          </div>
          
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Upcoming Exams</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 transition-transform hover:transform hover:scale-105">
                  <div className="flex justify-center mb-4">
                    {exam.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-center mb-2">{exam.name}</h4>
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="flex items-center mb-2 text-sm sm:text-base">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Exam Date: {exam.date}</span>
                  </div>
                  <div className="flex items-center text-sm sm:text-base">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Registration: {exam.registrationDate}</span>
                  </div>
                  <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Prepare Now
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Popular Exams Slider - Responsive */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Popular Exams</h3>
            <div className="relative px-8 sm:px-12">
              <button 
                onClick={handlePrevExam}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-lg hover:bg-gray-100"
                aria-label="Previous exam"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </button>
              
              {/* Mobile and Desktop Slider */}
              <div className="overflow-hidden relative w-full">
                <div className="flex justify-center">
                  {popularExams.map((exam, index) => (
                    <div 
                      key={exam.id}
                      className={`w-full max-w-xs mx-2 sm:mx-4 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out 
                        ${index === activeExamIndex ? 'scale-100 sm:scale-105 border-2 border-blue-500' : 'hidden sm:block sm:scale-95 sm:opacity-60'}`}
                      style={{transform: `translateX(${(activeExamIndex - index) * 280}px)`}}
                    >
                      <img src={exam.image} alt={exam.name} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h4 className="text-lg sm:text-xl font-bold mb-1">{exam.name}</h4>
                        <p className="text-gray-500 text-sm mb-2">{exam.category}</p>
                        <div className="flex items-center text-sm text-gray-700">
                          <GraduationCap className="h-4 w-4 mr-1 flex-shrink-0" />
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
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-lg hover:bg-gray-100"
                aria-label="Next exam"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </button>
            </div>
            
            {/* Mobile Slider Indicators */}
            <div className="flex justify-center mt-4 space-x-2 sm:hidden">
              {popularExams.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${index === activeExamIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                  onClick={() => setActiveExamIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mock Test Registration - Responsive Form */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Register for Free Mock Tests</h2>
          <p className="text-base sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Experience real exam conditions and assess your preparation level with our comprehensive mock tests.
          </p>
          <form className="max-w-3xl mx-auto flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Choose Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We offer a comprehensive approach to exam preparation that maximizes your chances of success
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-3">{item.title}</h3>
                <p className="text-gray-700 text-center text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section id="resources" className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Access Free Resources</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Kickstart your preparation with our collection of free study materials and tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {freeResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-center">
                  {resource.icon}
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">{resource.description}</p>
                  <button className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition">
                    Access Now <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md">
              View All Resources
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">What Our Students Say</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/60/60" alt="Student" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Ravi Kumar</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Cleared UPSC CSE 2024</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base">
                "The mock tests were incredibly similar to the actual exam pattern. The detailed analytics helped me identify my weak areas and work on them effectively."
              </p>
              <div className="flex mt-3">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/60/60" alt="Student" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Priya Singh</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Bank PO 2024 Topper</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base">
                "The question bank is extensive and covers all possible topics. The personalized study plan helped me structure my preparation effectively and manage my time better."
              </p>
              <div className="flex mt-3">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/60/60" alt="Student" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Anish Mehta</h4>
                  <p className="text-xs sm:text-sm text-gray-600">JEE Advanced 2024</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base">
                "The expert faculty guidance and detailed solution explanations made complex concepts easy to understand. The competitive environment motivated me to push my limits."
              </p>
              <div className="flex mt-3">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your Preparation Journey?</h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of successful candidates who have transformed their preparation with our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              className="px-6 sm:px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition shadow-lg text-base sm:text-lg font-semibold"
              onClick={openSignupPopup}
            >
              Start Free Trial
            </button>
            <button className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:bg-opacity-10 transition text-base sm:text-lg font-semibold">
              View Pricing Plans
            </button>
          </div>
          <div className="mt-6 sm:mt-10 text-center">
            <p className="flex items-center justify-center text-sm sm:text-base">
              <Gift className="h-5 w-5 mr-2" /> No credit card required. 7-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get in Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Have questions about our platform or need assistance? Our team is here to help you!
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            <div className="md:w-1/2">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-700">support@questionbank.com</p>
                    <p className="text-gray-700">info@questionbank.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-700">+91 9876543210</p>
                    <p className="text-gray-700">+91 1234567890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-gray-700">
                      QuestionBank Educational Services Pvt. Ltd.<br />
                      123, Tech Park, Sector 15<br />
                      Gurugram, Haryana - 122001
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-blue-100 transition">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                  </a>
                  <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-blue-100 transition">
                    <Instagram className="h-5 w-5 text-blue-600" />
                  </a>
                  <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-blue-100 transition">
                    <Twitter className="h-5 w-5 text-blue-600" />
                  </a>
                  <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-blue-100 transition">
                    <Youtube className="h-5 w-5 text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                QuestionBank
              </div>
              <p className="text-gray-400 mb-4">
                Your one-stop solution for comprehensive exam preparation. We help students achieve their academic and career goals through personalized learning.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Twitter className="h-5 w-5" />
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
                <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Exams</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">UPSC</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">SSC</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Banking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">JEE/NEET</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">GATE</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Refund Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} QuestionBank Educational Services. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;