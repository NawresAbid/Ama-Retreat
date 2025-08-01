"use client"; // This component uses client-side features like `useState` if needed, and for general client-side rendering.

import { Card, CardContent } from '@/components/ui/card';
// Removed Lucide React Star import as we are using a custom SVG

const TestimonialsSection = () => {
  // Define colors directly within the component, adjusted to match the image more closely
  const colors = {
    gold50: '#FFFDF7', // Very light gold for gradient start
    beige100: '#F9ECD9', // Light beige for gradient end
    brown500: '#8B4513', // Medium brown for location text
    brown700: '#6B4728', // Darker brown for testimonial text and initial
    brown800: '#5C3A1F', // Deepest brown for headings and names
    gold200: '#FCECC4', // Light gold for initial circle gradient start
    beige200: '#EEE4D1', // Light beige for initial circle gradient end
    gold400: '#E6C772', // Gold for filled stars
    white: '#FFFFFF', // For card background
  };

  // Custom SVG for the Star icon to match the image's style
  const CustomStarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 18 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  const testimonials = [
    {
      name: "Marie Dubois",
      location: "Paris",
      text: "Une expérience transformatrice ! J'ai retrouvé mon équilibre intérieur et reparti avec une nouvelle énergie. L'équipe d'AMA Retreat est exceptionnelle.",
      rating: 5
    },
    {
      name: "Thomas Martin",
      location: "Lyon",
      text: "Le cadre est magnifique et les activités parfaitement orchestrées. Cette retraite m'a permis de me reconnecter avec mes priorités essentielles.",
      rating: 5
    },
    {
      name: "Sophie Laurent",
      location: "Bordeaux",
      text: "Tout était parfait : les cours de yoga, la nourriture délicieuse, les massages... Je recommande vivement cette retraite de bien-être !",
      rating: 5
    }
  ];

  return (
    <section
      className="py-20"
      style={{ backgroundImage: `linear-gradient(to bottom right, ${colors.gold50}, ${colors.beige100})` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: colors.brown800 }}>
            Témoignages
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.brown500 }}>
            Découvrez les expériences de nos clients qui ont vécu cette transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{
                animationDelay: `${index * 0.2}s`,
                backgroundColor: `${colors.white}CC` // 80% opacity white
              }}
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <CustomStarIcon key={i} style={{ fill: colors.gold400, color: colors.gold400 }} />
                  ))}
                </div>

                <p className="italic mb-6 leading-relaxed" style={{ color: colors.brown700 }}>
                  &quot;{testimonial.text}&quot;
                </p>

                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${colors.gold200}, ${colors.beige200})` }}
                  >
                    <span className="font-medium text-lg" style={{ color: colors.brown700 }}>
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium" style={{ color: colors.brown800 }}>{testimonial.name}</h4>
                    <p className="text-sm" style={{ color: colors.brown500 }}>{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;