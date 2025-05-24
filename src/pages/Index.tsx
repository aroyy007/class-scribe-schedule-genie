
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 hero-doodle-bg bg-background relative overflow-hidden">
        <div className="hero-content container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Class Schedule Generation,<br className="hidden md:block" /> Simplified
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Upload PDF documents, automatically extract course data, and generate 
            personalized class schedules for students in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Button asChild size="lg" className="text-base w-full sm:w-auto">
              <Link to="/student">Student Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">1. Upload Documents</h3>
              <p className="text-sm md:text-base text-gray-600">
                Administrators upload PDF documents containing course information and class schedules.
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">2. Extract Data</h3>
              <p className="text-sm md:text-base text-gray-600">
                Our system automatically extracts and processes structured data from the uploaded PDFs.
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">3. Generate Schedules</h3>
              <p className="text-sm md:text-base text-gray-600">
                Students select their semester and section to view and download their personalized schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Simplify Your Scheduling Process?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Join educational institutions that have streamlined their class scheduling with Class Scribe.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-primary w-full sm:w-auto">
            <Link to="/student">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
