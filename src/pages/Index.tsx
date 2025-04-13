
import { Link } from "react-router-dom";
import { BookOpen, BookText, Library, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-pattern pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Library <span className="text-bookworm-500">Management</span> System
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover, borrow, and manage books with ease. Join our community of book lovers today.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Link to="/books">
                    <Button size="lg" className="w-full sm:w-auto">
                      Browse Books
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                )}
                <Link to="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                <div className="absolute -top-6 -left-6 h-64 w-64 bg-bookworm-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
                <div className="absolute -bottom-8 -right-8 h-64 w-64 bg-bookworm-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "2s" }}></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="Library with books"
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Books
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our library management system provides powerful features to help you organize, discover, and enjoy your reading experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-bookworm-50 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-bookworm-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Extensive Collection
              </h3>
              <p className="text-gray-600">
                Access thousands of books across various genres and categories.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-bookworm-50 rounded-lg flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-bookworm-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Advanced Search
              </h3>
              <p className="text-gray-600">
                Find books quickly with our powerful search and filtering options.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-bookworm-50 rounded-lg flex items-center justify-center mb-6">
                <BookText className="w-8 h-8 text-bookworm-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Reading Tracking
              </h3>
              <p className="text-gray-600">
                Keep track of your borrowed books, reading history, and favorites.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-bookworm-50 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-bookworm-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Features
              </h3>
              <p className="text-gray-600">
                Connect with other readers, share reviews, and get recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <h3 className="text-5xl font-bold text-bookworm-500 mb-2">10K+</h3>
              <p className="text-gray-600">Books Available</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <h3 className="text-5xl font-bold text-bookworm-500 mb-2">5K+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <h3 className="text-5xl font-bold text-bookworm-500 mb-2">500+</h3>
              <p className="text-gray-600">New Books Monthly</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <h3 className="text-5xl font-bold text-bookworm-500 mb-2">24/7</h3>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our community of readers and book enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="User"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Emma Thompson</h4>
                  <p className="text-gray-500">Book Lover</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This library system has completely transformed how I discover and read books. The interface is intuitive, and I love how easy it is to track my reading progress."
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://randomuser.me/api/portraits/men/44.jpg"
                    alt="User"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Michael Chen</h4>
                  <p className="text-gray-500">Student</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a student, I rely heavily on the library for research. This system makes it incredibly easy to find and borrow the books I need for my studies."
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="User"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-500">Teacher</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I recommend Bookworm to all my fellow teachers. It's a fantastic resource for finding educational materials and encouraging students to develop a love for reading."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bookworm-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of readers who have already discovered the joy of our library management system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            {isAuthenticated ? (
              <Link to="/books">
                <Button size="lg">Browse Books</Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg">Sign Up Now</Button>
              </Link>
            )}
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
