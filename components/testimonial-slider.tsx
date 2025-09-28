"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ahmed Rahman",
    company: "Tech Solutions BD",
    location: "Dhaka, Bangladesh",
    content:
      "Alpha Net BD has been our hosting partner for 3 years. Their reliability and support are unmatched in Bangladesh. Our e-commerce site handles thousands of transactions daily without any issues.",
    rating: 5,
    avatar: "/professional-man-avatar-ahmed-rahman.jpg",
    verified: true,
  },
  {
    name: "Fatima Khan",
    company: "E-commerce Store",
    location: "Chittagong, Bangladesh",
    content:
      "Excellent service and competitive pricing. My online store has been running smoothly since day one. The customer support team is incredibly responsive and knowledgeable.",
    rating: 5,
    avatar: "/professional-woman-avatar-fatima-khan.jpg",
    verified: true,
  },
  {
    name: "Mohammad Ali",
    company: "Digital Agency",
    location: "Sylhet, Bangladesh",
    content:
      "Professional service with local expertise. They understand the Bangladeshi market perfectly and provide solutions tailored to our needs.",
    rating: 5,
    avatar: "/professional-man-avatar-mohammad-ali.jpg",
    verified: true,
  },
  {
    name: "Rashida Begum",
    company: "Online Education Platform",
    location: "Rajshahi, Bangladesh",
    content:
      "Our educational platform serves thousands of students daily. Alpha Net BD's hosting infrastructure ensures zero downtime during peak hours. Exceptional service!",
    rating: 5,
    avatar: "/professional-woman-avatar-rashida-begum.jpg",
    verified: true,
  },
  {
    name: "Karim Hassan",
    company: "Manufacturing Company",
    location: "Gazipur, Bangladesh",
    content:
      "Migrated our entire business infrastructure to Alpha Net BD. The migration was seamless, and our website performance improved significantly. Highly recommended!",
    rating: 5,
    avatar: "/professional-man-avatar-karim-hassan.jpg",
    verified: true,
  },
  {
    name: "Nasreen Ahmed",
    company: "Healthcare Services",
    location: "Khulna, Bangladesh",
    content:
      "As a healthcare provider, uptime is critical for us. Alpha Net BD delivers 99.9% uptime consistently. Their security features give us peace of mind.",
    rating: 5,
    avatar: "/professional-woman-avatar-nasreen-ahmed.jpg",
    verified: true,
  },
  {
    name: "Rafiq Islam",
    company: "Travel Agency",
    location: "Cox's Bazar, Bangladesh",
    content:
      "Our booking system processes hundreds of reservations daily. Alpha Net BD's hosting handles our traffic spikes during peak season flawlessly.",
    rating: 5,
    avatar: "/professional-man-avatar-rafiq-islam.jpg",
    verified: true,
  },
  {
    name: "Salma Khatun",
    company: "Fashion Boutique",
    location: "Dhaka, Bangladesh",
    content:
      "Switched to Alpha Net BD last year and couldn't be happier. My fashion website loads incredibly fast, and the SSL certificate was included free!",
    rating: 5,
    avatar: "/professional-woman-avatar-salma-khatun.jpg",
    verified: true,
  },
  {
    name: "Habib Rahman",
    company: "Software Development",
    location: "Dhaka, Bangladesh",
    content:
      "As developers, we need reliable hosting for our client projects. Alpha Net BD provides excellent developer tools and staging environments.",
    rating: 5,
    avatar: "/professional-man-avatar-habib-rahman.jpg",
    verified: true,
  },
  {
    name: "Ruma Akter",
    company: "Food Delivery Service",
    location: "Chittagong, Bangladesh",
    content:
      "Our food delivery app requires real-time processing. Alpha Net BD's infrastructure supports our mobile app backend perfectly with minimal latency.",
    rating: 5,
    avatar: "/professional-woman-avatar-ruma-akter.jpg",
    verified: true,
  },
  {
    name: "Shahid Hasan",
    company: "Financial Services",
    location: "Dhaka, Bangladesh",
    content:
      "Security is paramount in our industry. Alpha Net BD's advanced security features and compliance support make them our trusted hosting partner.",
    rating: 5,
    avatar: "/professional-man-avatar-shahid-hasan.jpg",
    verified: true,
  },
  {
    name: "Taslima Begum",
    company: "News Portal",
    location: "Sylhet, Bangladesh",
    content:
      "Our news website experiences massive traffic during breaking news. Alpha Net BD's auto-scaling feature ensures our site never goes down.",
    rating: 5,
    avatar: "/professional-woman-avatar-taslima-begum.jpg",
    verified: true,
  },
  {
    name: "Mizanur Rahman",
    company: "Real Estate Agency",
    location: "Dhaka, Bangladesh",
    content:
      "Property listings with high-resolution images load instantly thanks to Alpha Net BD's CDN. Our clients love the fast browsing experience.",
    rating: 5,
    avatar: "/professional-man-avatar-mizanur-rahman.jpg",
    verified: true,
  },
  {
    name: "Shireen Khan",
    company: "Online Marketplace",
    location: "Chittagong, Bangladesh",
    content:
      "Managing thousands of vendor accounts and products requires robust hosting. Alpha Net BD handles our complex database operations effortlessly.",
    rating: 5,
    avatar: "/professional-woman-avatar-shireen-khan.jpg",
    verified: true,
  },
  {
    name: "Anwar Hossain",
    company: "Logistics Company",
    location: "Dhaka, Bangladesh",
    content:
      "Our tracking system needs to be available 24/7. Alpha Net BD's monitoring and support team ensures our services are always online.",
    rating: 5,
    avatar: "/professional-man-avatar-anwar-hossain.jpg",
    verified: true,
  },
  {
    name: "Farida Rahman",
    company: "Beauty Salon Chain",
    location: "Rajshahi, Bangladesh",
    content:
      "Online booking system for our salon chain works flawlessly. The integration with payment gateways was smooth and secure.",
    rating: 5,
    avatar: "/professional-woman-avatar-farida-rahman.jpg",
    verified: true,
  },
  {
    name: "Golam Kibria",
    company: "Agricultural Export",
    location: "Rangpur, Bangladesh",
    content:
      "Our B2B platform connects farmers with international buyers. Alpha Net BD's reliable hosting ensures smooth global communications.",
    rating: 5,
    avatar: "/professional-man-avatar-golam-kibria.jpg",
    verified: true,
  },
  {
    name: "Rehana Sultana",
    company: "Online Learning Platform",
    location: "Barisal, Bangladesh",
    content:
      "Video streaming for our courses requires high bandwidth. Alpha Net BD's infrastructure delivers smooth video playback for thousands of students.",
    rating: 5,
    avatar: "/professional-woman-avatar-rehana-sultana.jpg",
    verified: true,
  },
  {
    name: "Jahangir Alam",
    company: "Pharmaceutical Company",
    location: "Dhaka, Bangladesh",
    content:
      "Compliance and data security are critical in pharma. Alpha Net BD meets all our regulatory requirements with their secure hosting environment.",
    rating: 5,
    avatar: "/professional-man-avatar-jahangir-alam.jpg",
    verified: true,
  },
  {
    name: "Maksuda Khatun",
    company: "Handicrafts Export",
    location: "Jessore, Bangladesh",
    content:
      "Our artisan marketplace showcases traditional Bangladeshi crafts globally. Alpha Net BD's hosting brings our culture to the world.",
    rating: 5,
    avatar: "/professional-woman-avatar-maksuda-khatun.jpg",
    verified: true,
  },
  {
    name: "Delwar Hossain",
    company: "IT Consultancy",
    location: "Dhaka, Bangladesh",
    content:
      "We recommend Alpha Net BD to all our clients. Their technical expertise and local presence make them the best choice for Bangladeshi businesses.",
    rating: 5,
    avatar: "/professional-man-avatar-delwar-hossain.jpg",
    verified: true,
  },
  {
    name: "Shamima Akter",
    company: "Event Management",
    location: "Chittagong, Bangladesh",
    content:
      "Our event booking platform handles last-minute rushes perfectly. Alpha Net BD's scalable hosting grows with our business needs.",
    rating: 5,
    avatar: "/professional-woman-avatar-shamima-akter.jpg",
    verified: true,
  },
  {
    name: "Nurul Islam",
    company: "Textile Manufacturing",
    location: "Narayanganj, Bangladesh",
    content:
      "B2B portal for textile orders processes millions in transactions. Alpha Net BD's secure payment integration gives our clients confidence.",
    rating: 5,
    avatar: "/professional-man-avatar-nurul-islam.jpg",
    verified: true,
  },
  {
    name: "Rokeya Begum",
    company: "Women's Cooperative",
    location: "Rangpur, Bangladesh",
    content:
      "Our cooperative's e-commerce site empowers rural women entrepreneurs. Alpha Net BD's affordable hosting makes technology accessible.",
    rating: 5,
    avatar: "/professional-woman-avatar-rokeya-begum.jpg",
    verified: true,
  },
  {
    name: "Abdur Rahman",
    company: "Fintech Startup",
    location: "Dhaka, Bangladesh",
    content:
      "As a fintech startup, we need enterprise-grade security on a startup budget. Alpha Net BD delivers both without compromise.",
    rating: 5,
    avatar: "/professional-man-avatar-abdur-rahman.jpg",
    verified: true,
  },
  {
    name: "Sultana Razia",
    company: "Digital Marketing Agency",
    location: "Sylhet, Bangladesh",
    content:
      "Managing multiple client websites is easy with Alpha Net BD's control panel. Their white-label solutions help us serve clients better.",
    rating: 5,
    avatar: "/professional-woman-avatar-sultana-razia.jpg",
    verified: true,
  },
  {
    name: "Mofizul Islam",
    company: "Construction Company",
    location: "Dhaka, Bangladesh",
    content:
      "Project management portal keeps our construction teams connected. Alpha Net BD's mobile-optimized hosting works great on job sites.",
    rating: 5,
    avatar: "/professional-man-avatar-mofizul-islam.jpg",
    verified: true,
  },
  {
    name: "Nasir Ahmed",
    company: "Import/Export Business",
    location: "Chittagong, Bangladesh",
    content:
      "International trade requires reliable communication. Our business portal hosted on Alpha Net BD connects us with global partners seamlessly.",
    rating: 5,
    avatar: "/professional-man-avatar-nasir-ahmed.jpg",
    verified: true,
  },
  {
    name: "Rahima Khatun",
    company: "Online Grocery Store",
    location: "Dhaka, Bangladesh",
    content:
      "Fresh grocery delivery needs real-time inventory management. Alpha Net BD's database performance keeps our stock levels accurate.",
    rating: 5,
    avatar: "/professional-woman-avatar-rahima-khatun.jpg",
    verified: true,
  },
  {
    name: "Kamrul Hassan",
    company: "Mobile App Development",
    location: "Dhaka, Bangladesh",
    content:
      "Backend APIs for our mobile apps are hosted on Alpha Net BD. Low latency and high availability ensure great user experience.",
    rating: 5,
    avatar: "/professional-man-avatar-kamrul-hassan.jpg",
    verified: true,
  },
  {
    name: "Bilkis Begum",
    company: "Charity Organization",
    location: "Rajshahi, Bangladesh",
    content:
      "Our donation platform processes contributions from around the world. Alpha Net BD's secure hosting protects donor information and builds trust.",
    rating: 5,
    avatar: "/professional-woman-avatar-bilkis-begum.jpg",
    verified: true,
  },
  {
    name: "Shafiqul Islam",
    company: "Government Contractor",
    location: "Dhaka, Bangladesh",
    content:
      "Government projects require strict compliance and security. Alpha Net BD meets all requirements while delivering excellent performance.",
    rating: 5,
    avatar: "/professional-man-avatar-shafiqul-islam.jpg",
    verified: true,
  },
  {
    name: "Hosne Ara",
    company: "University Administration",
    location: "Dhaka, Bangladesh",
    content:
      "Student portal serves 50,000+ students and faculty. Alpha Net BD's educational hosting solutions handle our academic calendar perfectly.",
    rating: 5,
    avatar: "/professional-woman-avatar-hosne-ara.jpg",
    verified: true,
  },
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const getTestimonialsPerPage = () => {
    if (isMobile) return 1
    return window.innerWidth >= 1024 ? 3 : 2
  }

  const [testimonialsPerPage, setTestimonialsPerPage] = useState(3)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setTestimonialsPerPage(getTestimonialsPerPage())
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalPages])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const getCurrentTestimonials = () => {
    const start = currentIndex * testimonialsPerPage
    return testimonials.slice(start, start + testimonialsPerPage)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="flex">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                  {testimonials
                    .slice(pageIndex * testimonialsPerPage, (pageIndex + 1) * testimonialsPerPage)
                    .map((testimonial, index) => (
                      <Card
                        key={`${pageIndex}-${index}`}
                        className="card-hover relative overflow-hidden transform transition-all duration-500 hover:scale-105"
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-primary text-primary animate-pulse" />
                              ))}
                            </div>
                            {testimonial.verified && (
                              <Badge variant="secondary" className="text-xs animate-bounce">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="relative">
                            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                            <p className="text-muted-foreground italic leading-relaxed pl-6">"{testimonial.content}"</p>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-3">
                            <img
                              src={
                                testimonial.avatar || "/placeholder.svg?height=48&width=48&query=professional avatar"
                              }
                              alt={testimonial.name}
                              className="h-12 w-12 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <div>
                              <div className="font-semibold text-foreground">{testimonial.name}</div>
                              <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                              <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-10 w-10 p-0 bg-transparent hover:bg-primary/10 transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex === totalPages - 1}
            className="h-10 w-10 p-0 bg-transparent hover:bg-primary/10 transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 max-w-xs overflow-x-auto">
          {Array.from({ length: Math.min(totalPages, 10) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-6 shadow-lg"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
          {totalPages > 10 && <span className="text-xs text-muted-foreground">...</span>}
        </div>

        <div className="text-sm text-muted-foreground text-center sm:text-left">
          <span className="hidden sm:inline">Showing </span>
          {currentIndex * testimonialsPerPage + 1}-
          {Math.min((currentIndex + 1) * testimonialsPerPage, testimonials.length)}
          <span className="hidden sm:inline"> of</span>
          <span className="sm:hidden">/</span> {testimonials.length}
          <span className="hidden sm:inline"> reviews</span>
        </div>
      </div>

      {isAutoPlaying && (
        <div className="absolute top-0 right-0 bg-primary/10 text-primary text-xs px-2 py-1 rounded-bl-lg animate-pulse">
          Auto-playing
        </div>
      )}
    </div>
  )
}
