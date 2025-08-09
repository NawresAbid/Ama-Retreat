import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const ProgramSection = () => {
  // Define colors directly within the component, adjusted to match the image more closely
  const colors = {
    beige50: '#FDF8F0', // Lighter background, closer to the image's overall light tone
    beige100: '#F9ECD9', // Slightly darker beige for gradient, still light
    brown600: '#7A5230', // A softer, warmer brown for descriptions and general text
    brown800: '#5C3A1F', // A deeper, richer brown for headings
    gold100: '#E0B87A', // A muted, warm gold for the gradient start
    gold600: '#B58C58', // A slightly darker, more earthy gold for icons
  };

  const programs = [
    {
      // Custom SVG for Yoga (Refined Heart outline to match image)
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      title: "Yoga",
      description: "Sessions de yoga quotidiennes pour harmoniser corps et esprit dans un cadre paisible.",
      iconColor: colors.gold600
    },
    {
      // Custom SVG for Alimentation Saine (Stylized Fork and Knife to match image)
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 2c.5 1.5 1 3 1 5s-.5 3.5-1 5c-.5 1.5-1 3-1 5h2c0-2 1-4 1.5-5.5.5-1.5 1-3 1-5s-.5-3.5-1-5c-.5-1.5-1-3-1-5H7z"/>
          <path d="M17 2c-.5 1.5-1 3-1 5s.5 3.5 1 5c.5 1.5 1 3 1 5h-2c0-2-1-4-1.5-5.5-.5-1.5-1-3-1-5s.5-3.5 1-5c.5-1.5 1-3 1-5h2z"/>
          <line x1="12" y1="2" x2="12" y2="22" strokeWidth="1"/>
        </svg>
      ),
      title: "Alimentation Saine",
      description: "Cuisine méditerranéenne  bio préparée avec des ingrédients locaux et de saison.",
      iconColor: colors.brown600
    },
    {
      // Custom SVG for Sport (Fluid Pulse line to match image)
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h3.5l2.5-8 5 16 2.5-8H21"/>
        </svg>
      ),
      title: "Sport",
      description: "Activités physiques douces adaptées à tous les niveaux pour revitaliser votre corps.",
      iconColor: colors.gold600
    },
    {
      // Custom SVG for Massage (Irregular Sparkle/Star to match image)
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
          <path d="M20 10l-1.5 1.5L17 13l1.5 1.5L20 16l1.5-1.5L23 13l-1.5-1.5L20 10z"/>
          <path d="M4 10l-1.5 1.5L1 13l1.5 1.5L4 16l1.5-1.5L7 13l-1.5-1.5L4 10z"/>
        </svg>
      ),
      title: "Massage",
      description: "Soins relaxants et thérapeutiques pour libérer les tensions et retrouver l'équilibre.",
      iconColor: colors.brown600
    }
  ];

  return (
    <section id="programme" className="py-20" style={{ backgroundColor: colors.beige50 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: colors.brown800 }}>
            Notre Programme
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.brown600 }}>
            Un séjour complet conçue pour votre bien-être physique, mental et spirituel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <Card
                key={program.title}
                className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br mb-4`}
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${colors.gold100}, ${colors.beige100})`,
                      color: program.iconColor // Apply the icon-specific color
                    }}
                  >
                    <IconComponent width={32} height={32} />
                  </div>
                  <CardTitle className="text-xl font-serif" style={{ color: colors.brown800 }}>
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed" style={{ color: colors.brown600 }}>
                    {program.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
