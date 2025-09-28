import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TestimonialSlider } from "@/components/testimonial-slider"
import { LazyLoadingSection } from "@/components/lazy-loading-section"
import {
  Search,
  Server,
  Shield,
  Headphones,
  Globe,
  Zap,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Database,
  Wifi,
  Clock,
  MapPin,
  Phone,
  Mail,
  Rocket,
  Target,
  Heart,
  Play,
  MousePointer,
  Sparkles,
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Globe,
      title: "Domain Registration",
      description: "Register your perfect domain name with competitive pricing and instant activation.",
    },
    {
      icon: Server,
      title: "Web Hosting",
      description: "Fast, reliable hosting with 99.9% uptime guarantee and SSD storage.",
    },
    {
      icon: Shield,
      title: "SSL Security",
      description: "Free SSL certificates with all hosting plans to keep your site secure.",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Lightning-fast loading speeds with our optimized servers and CDN.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock technical support from our expert team.",
    },
    {
      icon: Search,
      title: "Easy Management",
      description: "User-friendly control panel to manage all your services effortlessly.",
    },
  ]

  const stats = [
    { icon: Users, number: "50,000+", label: "Happy Customers" },
    { icon: Server, number: "99.9%", label: "Uptime Guarantee" },
    { icon: Globe, number: "100,000+", label: "Domains Registered" },
    { icon: Award, number: "10+", label: "Years Experience" },
  ]

  const testimonials = [
    {
      name: "Ahmed Rahman",
      company: "Tech Solutions BD",
      content:
        "Alpha Net BD has been our hosting partner for 3 years. Their reliability and support are unmatched in Bangladesh.",
      rating: 5,
      avatar: "/professional-man-avatar-ahmed-rahman.jpg",
    },
    {
      name: "Fatima Khan",
      company: "E-commerce Store",
      content: "Excellent service and competitive pricing. My online store has been running smoothly since day one.",
      rating: 5,
      avatar: "/professional-woman-avatar-fatima-khan.jpg",
    },
    {
      name: "Mohammad Ali",
      company: "Digital Agency",
      content: "Professional service with local expertise. They understand the Bangladeshi market perfectly.",
      rating: 5,
      avatar: "/professional-man-avatar-mohammad-ali.jpg",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "৳500",
      period: "/month",
      description: "Perfect for personal websites and blogs",
      features: ["1 Website", "10GB SSD Storage", "Unlimited Bandwidth", "Free SSL Certificate", "24/7 Support"],
      popular: false,
    },
    {
      name: "Business",
      price: "৳1,200",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "5 Websites",
        "50GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Priority Support",
        "Daily Backups",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "৳2,500",
      period: "/month",
      description: "For high-traffic websites",
      features: [
        "Unlimited Websites",
        "200GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Dedicated Support",
        "Advanced Security",
      ],
      popular: false,
    },
  ]

  const services = [
    {
      icon: Globe,
      title: "Domain Services",
      description: "Complete domain management with competitive pricing",
      features: ["Domain Registration", "Domain Transfer", "DNS Management", "WHOIS Privacy"],
    },
    {
      icon: Server,
      title: "Hosting Solutions",
      description: "Reliable hosting infrastructure for all business sizes",
      features: ["Shared Hosting", "VPS Hosting", "Dedicated Servers", "Cloud Hosting"],
    },
    {
      icon: Shield,
      title: "Security Services",
      description: "Comprehensive security solutions for your online presence",
      features: ["SSL Certificates", "DDoS Protection", "Malware Scanning", "Security Monitoring"],
    },
    {
      icon: Mail,
      title: "Email Solutions",
      description: "Professional email hosting with advanced features",
      features: ["Business Email", "Email Security", "Collaboration Tools", "Mobile Access"],
    },
  ]

  const whyChooseUs = [
    {
      icon: Target,
      title: "Local Expertise",
      description: "Deep understanding of the Bangladeshi market and business needs",
    },
    {
      icon: Rocket,
      title: "Cutting-edge Technology",
      description: "Latest server technology and infrastructure for optimal performance",
    },
    {
      icon: Heart,
      title: "Customer-Centric",
      description: "Your success is our priority with personalized support and solutions",
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "10+ years of excellence serving thousands of satisfied customers",
    },
  ]

  const hostingComparison = [
    {
      feature: "Storage Space",
      starter: "10GB SSD",
      business: "50GB SSD",
      enterprise: "200GB SSD",
    },
    {
      feature: "Bandwidth",
      starter: "Unlimited",
      business: "Unlimited",
      enterprise: "Unlimited",
    },
    {
      feature: "Websites",
      starter: "1",
      business: "5",
      enterprise: "Unlimited",
    },
    {
      feature: "Email Accounts",
      starter: "5",
      business: "25",
      enterprise: "Unlimited",
    },
    {
      feature: "SSL Certificate",
      starter: "Free",
      business: "Free",
      enterprise: "Free + Wildcard",
    },
    {
      feature: "Daily Backups",
      starter: "Manual",
      business: "Automatic",
      enterprise: "Automatic + Hourly",
    },
    {
      feature: "Support Level",
      starter: "Standard",
      business: "Priority",
      enterprise: "Dedicated Manager",
    },
  ]

  const faqs = [
    {
      question: "What is included in the hosting plans?",
      answer:
        "All hosting plans include SSD storage, unlimited bandwidth, free SSL certificate, email accounts, and 24/7 support. Higher tier plans include additional features like priority support and advanced security.",
    },
    {
      question: "How long does it take to set up my hosting account?",
      answer:
        "Your hosting account is activated instantly after payment confirmation. Domain propagation may take 24-48 hours to complete globally.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer:
        "Yes, we offer a 30-day money-back guarantee on all hosting plans. If you're not satisfied, we'll refund your payment within 30 days of signup.",
    },
    {
      question: "Can I upgrade or downgrade my hosting plan?",
      answer:
        "You can upgrade or downgrade your hosting plan at any time through your control panel. Changes take effect immediately.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We provide 24/7 technical support via live chat, email, and phone. Our expert team is always ready to help with any hosting-related questions or issues.",
    },
    {
      question: "Do you provide website migration services?",
      answer:
        "Yes, we offer free website migration services for all new customers. Our technical team will handle the entire migration process to ensure zero downtime.",
    },
  ]

  const blogPosts = [
    {
      title: "Complete Guide to Domain Registration in Bangladesh",
      excerpt:
        "Everything you need to know about registering domains in Bangladesh, including legal requirements and best practices.",
      category: "Domains",
      readTime: "5 min read",
      date: "Dec 15, 2024",
      image: "/domain-registration-guide.jpg",
    },
    {
      title: "Web Hosting Security Best Practices",
      excerpt: "Essential security measures to protect your website from cyber threats and ensure data safety.",
      category: "Security",
      readTime: "8 min read",
      date: "Dec 12, 2024",
      image: "/web-security-shield.jpg",
    },
    {
      title: "Optimizing Website Performance for Bangladesh Users",
      excerpt: "Tips and techniques to improve your website's loading speed and performance for local audiences.",
      category: "Performance",
      readTime: "6 min read",
      date: "Dec 10, 2024",
      image: "/website-performance.png",
    },
  ]

  const securityFeatures = [
    {
      icon: Shield,
      title: "DDoS Protection",
      description: "Advanced protection against distributed denial-of-service attacks",
    },
    {
      icon: Database,
      title: "Daily Backups",
      description: "Automated daily backups with easy one-click restore functionality",
    },
    {
      icon: CheckCircle,
      title: "Malware Scanning",
      description: "Real-time malware detection and removal to keep your site clean",
    },
    {
      icon: Globe,
      title: "SSL Certificates",
      description: "Free SSL certificates for all domains with automatic renewal",
    },
  ]

  const uptimeFeatures = [
    {
      icon: Server,
      title: "99.9% Uptime SLA",
      description: "Guaranteed uptime with service level agreement and compensation",
    },
    {
      icon: Zap,
      title: "Redundant Infrastructure",
      description: "Multiple data centers with failover protection",
    },
    {
      icon: TrendingUp,
      title: "Real-time Monitoring",
      description: "24/7 server monitoring with instant issue detection",
    },
    {
      icon: Headphones,
      title: "Proactive Support",
      description: "Our team monitors and resolves issues before they affect you",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="hero-gradient min-h-screen flex items-center justify-center py-20 px-4 relative">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full floating-element"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-accent/20 rounded-full floating-element"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-1 h-1 bg-primary/40 rounded-full floating-element"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="container mx-auto hero-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <div className="animate-fade-in-up">
                  <Badge
                    variant="outline"
                    className="mb-4 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Trusted by 50,000+ Businesses
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up-delay-1">
                  <span className="text-shimmer">The complete</span>
                  <br />
                  <span className="gradient-text">platform to</span>
                  <br />
                  <span className="text-foreground">build the web.</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up-delay-2">
                  Your team's toolkit to stop configuring and start innovating. Securely build, deploy, and scale the
                  best web experiences with Alpha Net BD.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up-delay-2">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold pulse-glow" asChild>
                  <Link href="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold border-primary/20 hover:border-primary/40 bg-transparent"
                  asChild
                >
                  <Link href="/hosting">
                    <Play className="mr-2 h-5 w-5" />
                    Explore Solutions
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-8 animate-fade-in-up-delay-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Demo/Stats */}
            <div className="relative animate-fade-in-up-delay-2">
              <div className="grid grid-cols-2 gap-4">
                <Card className="card-hover bg-card/50 backdrop-blur-sm border-primary/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-primary">20 days</div>
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <CardDescription className="text-sm">saved on daily builds.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground font-medium">ALPHA NET BD</div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-card/50 backdrop-blur-sm border-primary/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-primary">98%</div>
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <CardDescription className="text-sm">faster time to market.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground font-medium">PERFORMANCE</div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-card/50 backdrop-blur-sm border-primary/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-primary">300%</div>
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardDescription className="text-sm">increase in SEO.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground font-medium">OPTIMIZATION</div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-card/50 backdrop-blur-sm border-primary/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-primary">6x</div>
                      <Rocket className="h-6 w-6 text-primary" />
                    </div>
                    <CardDescription className="text-sm">faster to build + deploy.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground font-medium">DEPLOYMENT</div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional interactive element */}
              <div className="mt-8 p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-primary/10">
                <div className="flex items-center space-x-3 mb-4">
                  <MousePointer className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Make teamwork seamless.</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Tools for your team and stakeholders to share feedback and iterate faster.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full border-2 border-background"></div>
                    <div className="w-6 h-6 bg-accent rounded-full border-2 border-background"></div>
                    <div className="w-6 h-6 bg-secondary rounded-full border-2 border-background"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">+50K developers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <LazyLoadingSection className="py-20 px-4 bg-muted/20 border-t border-border/50" delay={300}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Trusted by industry leaders</h2>
            <p className="text-muted-foreground">Join thousands of companies building with Alpha Net BD</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </LazyLoadingSection>

      {/* Services Section */}
      <LazyLoadingSection className="py-20 px-4" delay={400}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Digital Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From domain registration to enterprise hosting, we provide everything you need for online success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </LazyLoadingSection>

      {/* Comparison Section */}
      <LazyLoadingSection className="py-20 px-4 bg-muted/30" delay={500}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Hosting Plans</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect hosting solution for your needs with our detailed comparison
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-lg border border-border">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Features</th>
                  <th className="text-center p-4 font-semibold">Starter</th>
                  <th className="text-center p-4 font-semibold bg-primary/5">Business</th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {hostingComparison.map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">{row.starter}</td>
                    <td className="p-4 text-center bg-primary/5">{row.business}</td>
                    <td className="p-4 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/hosting">
                View All Plans <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </LazyLoadingSection>

      {/* Security Section */}
      <LazyLoadingSection className="py-20 px-4" delay={600}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Security & Reliability</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your website's security and uptime are our top priorities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-8">Advanced Security Features</h3>
              <div className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Uptime Guarantee</h3>
              <div className="space-y-6">
                {uptimeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LazyLoadingSection>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Alpha Net BD?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive digital solutions to help your business thrive online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Professional Slider */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers across Bangladesh have to say about
              our services.
            </p>
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9/5</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">32+</div>
                <div className="text-sm text-muted-foreground">Verified Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* FAQ Section */}
      <LazyLoadingSection className="py-20 px-4 bg-muted/30" delay={700}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about our hosting services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Our Support Team</Link>
            </Button>
          </div>
        </div>
      </LazyLoadingSection>

      {/* Blog Section */}
      <LazyLoadingSection className="py-20 px-4" delay={800}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Resources & Guides</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest hosting tips, security guides, and industry insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="card-hover overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <Button variant="ghost" size="sm">
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Resources <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </LazyLoadingSection>

      {/* World-Class Infrastructure Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">World-Class Infrastructure</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our state-of-the-art data centers ensure maximum performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Server className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Tier-3 Data Centers</h3>
              <p className="text-muted-foreground text-sm">
                Enterprise-grade facilities with redundant power and cooling
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">SSD Storage</h3>
              <p className="text-muted-foreground text-sm">High-performance solid-state drives for faster loading</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Global CDN</h3>
              <p className="text-muted-foreground text-sm">Content delivery network for worldwide performance</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Monitoring</h3>
              <p className="text-muted-foreground text-sm">Round-the-clock infrastructure monitoring and support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Modern Technology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We use cutting-edge technology to ensure your website performs at its best
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Database className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">SSD Storage</h3>
              <p className="text-sm text-muted-foreground">Lightning-fast SSD drives for optimal performance</p>
            </div>
            <div className="text-center">
              <Wifi className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">CDN Network</h3>
              <p className="text-sm text-muted-foreground">Global content delivery for faster loading</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Advanced Security</h3>
              <p className="text-sm text-muted-foreground">Multi-layer security protection</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Auto Scaling</h3>
              <p className="text-sm text-muted-foreground">Automatic resource scaling as you grow</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of satisfied customers who trust Alpha Net BD for their online presence. Get started
                today with our reliable hosting solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+880 1700-000000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>support@alphanetbd.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>24/7 Support Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
