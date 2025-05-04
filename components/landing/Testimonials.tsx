
import { Star } from "lucide-react";

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
};

const Testimonial = ({ quote, author, role, company, avatar }: TestimonialProps) => {
  return (
    <div className="bg-background rounded-2xl p-6 shadow-sm border">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-lg mb-6">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img src={avatar} alt={author} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Loved by developers worldwide</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. See what our customers have to say about their experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Testimonial 
            quote="This platform has completely transformed our development workflow. We've cut our deployment time in half!"
            author="Sarah Johnson"
            role="CTO"
            company="TechStart"
            avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80"
          />
          
          <Testimonial 
            quote="The intuitive interface and powerful features make this the best development tool I've used in my 10-year career."
            author="Michael Chen"
            role="Lead Developer"
            company="CodeCraft"
            avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80"
          />
          
          <Testimonial 
            quote="Our team productivity increased by 40% in the first month after implementing this solution."
            author="Emma Rodriguez"
            role="Engineering Manager"
            company="DevSphere"
            avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;