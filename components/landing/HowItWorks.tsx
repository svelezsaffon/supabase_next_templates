import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground">
            Get up and running in minutes with our simple, streamlined process
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-12">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create your account</h3>
                  <p className="text-muted-foreground">
                    Sign up for free and get instant access to all our features. No credit card required.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connect your first project</h3>
                  <p className="text-muted-foreground">
                    Link your GitHub repository or start from one of our templates to get going quickly.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Build and deploy</h3>
                  <p className="text-muted-foreground">
                    Our platform handles the heavy lifting so you can focus on building great products.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Button size="lg">Get Started Now</Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl border">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=800&q=80" 
                alt="App workflow" 
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;