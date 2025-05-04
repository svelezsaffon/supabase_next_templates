
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-brand-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-brand-blue/10 rounded-full filter blur-3xl"></div>
      
      <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm mb-6 bg-background">
          <span className="flex h-2 w-2 rounded-full bg-brand-purple mr-2"></span>
          <p>Launching Soon</p>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl">
          A better way to <span className="gradient-text">build products</span> for the modern web
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
          Simplify your workflow, collaborate seamlessly, and ship faster with our intuitive platform designed for modern development teams.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button size="lg" className="w-full">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="w-full group">
            View Demo
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="mt-16 relative">
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-brand-purple/20 via-brand-blue/20 to-brand-purple-light/20 blur-xl"></div>
          
          <div className="glass-card p-2">
            <div className="rounded-xl overflow-hidden border shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=600&q=80" 
                alt="App Dashboard" 
                className="w-full object-cover animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;