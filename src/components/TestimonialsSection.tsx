import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Full Stack Developer",
    content: "Ho usato questo tool per validare l'idea della mia startup. L'analisi SWOT mi ha fatto notare criticità che non avevo considerato. Incredibile!",
    avatar: "MR",
    rating: 5
  },
  {
    name: "Giulia Bianchi",
    role: "Product Manager",
    content: "Finalmente riesco a comunicare meglio con il team tecnico. I prompt ottimizzati che genera sono molto più dettagliati e strutturati.",
    avatar: "GB",
    rating: 5
  },
  {
    name: "Alessandro Verdi",
    role: "CTO @ TechStartup",
    content: "Lo uso quotidianamente per fare review veloci delle specifiche. Il suggerimento del tech stack è sempre azzeccato e aggiornato.",
    avatar: "AV",
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 px-4 relative bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Testimonianze</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Amato da
            <br />
            <span className="gradient-text">sviluppatori e PM</span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-5 md:p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
