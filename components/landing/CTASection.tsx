
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="pricing" className="section-padding">
      <div className="container">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-purple to-brand-blue p-1">
          <div className="bg-background rounded-2xl p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to revolutionize your workflow?</h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Join thousands of developers who are already building better, faster applications.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="border rounded-xl p-6 text-left">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Standard</span>
                    <h3 className="text-3xl font-bold mt-1">$9</h3>
                    <p className="text-sm text-muted-foreground">per user / month</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-brand-blue/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-brand-blue" />
                      </div>
                      <span className="text-sm">Up to 5 projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-brand-blue/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-brand-blue" />
                      </div>
                      <span className="text-sm">Basic analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-brand-blue/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-brand-blue" />
                      </div>
                      <span className="text-sm">24/7 support</span>
                    </li>
                  </ul>
                  
                  <Button variant="outline" className="w-full">Get Started</Button>
                </div>
                
                <div className="border rounded-xl p-6 bg-gradient-to-br from-brand-purple/5 to-brand-blue/5 shadow-sm relative text-left">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-purple px-3 py-1 rounded-full text-xs text-white font-medium">
                    Most Popular
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Pro</span>
                    <h3 className="text-3xl font-bold mt-1">$29</h3>
                    <p className="text-sm text-muted-foreground">per user / month</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-brand-purple/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-brand-purple" />
                      </div>
                      <span className="text-sm">Unlimited projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-brand-purple/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-brand-purple" />
                      </div>
                      <span className="text-sm">Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-brand-purple/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-brand-purple" />
                      </div>
                      <span className="text-sm">Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-brand-purple/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-brand-purple" />
                      </div>
                      <span className="text-sm">Custom integrations</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
              
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm">
                <p>Have questions? <a href="#" className="text-brand-purple font-medium ml-1 inline-flex items-center">Contact sales <ArrowRight className="ml-1 h-3 w-3" /></a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Missing import for Check component
import { Check } from "lucide-react";

export default CTASection;