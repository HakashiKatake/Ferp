"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Video, Image as ImageIcon, Upload, Zap, Star, Award, Users } from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-100">
      {/* Navbar */}
      <div className="navbar bg-base-200/30 backdrop-blur-lg sticky top-0 z-50 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200/95 backdrop-blur-md rounded-box w-52">
              <li><button onClick={() => scrollToSection('features')}>Features</button></li>
              <li><button onClick={() => scrollToSection('how-it-works')}>How it Works</button></li>
              <li><button onClick={() => scrollToSection('pricing')}>Pricing</button></li>
              <li><button onClick={() => scrollToSection('testimonials')}>Testimonials</button></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">FERP</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><button onClick={() => scrollToSection('features')}>Features</button></li>
            <li><button onClick={() => scrollToSection('how-it-works')}>How it Works</button></li>
            <li><button onClick={() => scrollToSection('pricing')}>Pricing</button></li>
            <li><button onClick={() => scrollToSection('testimonials')}>Testimonials</button></li>
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <Link href="/sign-in" className="btn btn-ghost">Login</Link>
          <Link href="/sign-up" className="btn btn-primary">Sign Up</Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero min-h-[80vh] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-content text-center"
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">
              Transform Your Media Experience
            </h1>
            <p className="py-6 text-xl opacity-80">
              Your all-in-one platform for video compression and image generation. Unleash creativity with advanced AI tools.
            </p>
            <Link href="/sign-up" className="btn btn-primary btn-lg">
              Get Started <ArrowRight className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Video />, title: "Video Compression", desc: "Efficient compression without quality loss" },
              { icon: <ImageIcon />, title: "Image Generation", desc: "AI-powered image creation" },
              { icon: <Upload />, title: "Easy Upload", desc: "Simple drag and drop interface" },
              { icon: <Zap />, title: "Fast Processing", desc: "Lightning fast processing speeds" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card bg-base-200/30 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <div className="card-body items-center text-center">
                  <div className="text-primary text-3xl mb-4">{feature.icon}</div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="opacity-70">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-base-200/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "01", title: "Upload", desc: "Upload your media files" },
              { number: "02", title: "Process", desc: "AI processes your content" },
              { number: "03", title: "Download", desc: "Get your optimized media" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card bg-base-100/30 backdrop-blur-sm"
              >
                <div className="card-body">
                  <div className="text-5xl font-bold text-primary/30 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="opacity-70">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Basic", price: "Free", features: ["5 compressions/month", "Basic AI tools", "Email support"] },
              { title: "Pro", price: "$9.99", features: ["50 compressions/month", "Advanced AI tools", "Priority support"] },
              { title: "Enterprise", price: "Custom", features: ["Unlimited compressions", "Custom solutions", "24/7 support"] },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card bg-base-200/30 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="card-body text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <div className="text-4xl font-bold text-primary mb-4">{plan.price}</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="opacity-70">{feature}</li>
                    ))}
                  </ul>
                  <button className="btn btn-primary mt-6">Get Started</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-base-200/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Designer", content: "Amazing tool for my workflow!" },
              { name: "Jane Smith", role: "Developer", content: "Best compression tool ever!" },
              { name: "Mike Johnson", role: "Creator", content: "Couldn't work without it!" },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card bg-base-100/30 backdrop-blur-sm"
              >
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <Star className="text-primary" />
                    <Star className="text-primary" />
                    <Star className="text-primary" />
                    <Star className="text-primary" />
                    <Star className="text-primary" />
                  </div>
                  <p className="italic mb-4">"{testimonial.content}"</p>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="opacity-70 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-base-200/30 backdrop-blur-sm text-base-content">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Video Processing</a>
          <a className="link link-hover">Image Generation</a>
          <a className="link link-hover">AI Tools</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Careers</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
}