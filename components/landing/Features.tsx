import { Check, Code, Compass, Monitor } from "lucide-react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="feature-card">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Features designed for the modern developer</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to build, deploy, and scale your web applications faster than ever before.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Code className="text-brand-purple h-6 w-6" />}
            title="Intuitive API"
            description="Simple, powerful APIs that are easy to learn and integrate into your existing workflow."
          />
          
          <FeatureCard 
            icon={<Monitor className="text-brand-blue h-6 w-6" />}
            title="Seamless Integration"
            description="Works with your favorite tools and frameworks out of the box with minimal configuration."
          />
          
          <FeatureCard 
            icon={<Compass className="text-brand-purple h-6 w-6" />}
            title="Real-time Collaboration"
            description="Work together in real-time with your team, no matter where they are located."
          />
          
          <FeatureCard 
            icon={<Check className="text-brand-blue h-6 w-6" />}
            title="Automated Workflows"
            description="Streamline your development process with customizable automation tools."
          />
          
          <FeatureCard 
            icon={<Code className="text-brand-purple h-6 w-6" />}
            title="Advanced Security"
            description="Enterprise-grade security features to keep your data and applications safe."
          />
          
          <FeatureCard 
            icon={<Monitor className="text-brand-blue h-6 w-6" />}
            title="Detailed Analytics"
            description="Gain insights into user behavior and application performance with comprehensive analytics."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;