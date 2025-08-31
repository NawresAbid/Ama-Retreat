
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const ProgramSection = () => {
  const colors = {
    beige50: '#FDF8F0',
    beige100: '#F9ECD9',
    brown600: '#7A5230',
    brown800: '#5C3A1F',
    gold100: '#E0B87A',
    gold600: '#B58C58',
  };

  const programs = [
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      title: "Yoga",
      description: "Sessions de yoga quotidiennes pour harmoniser corps et esprit dans un cadre paisible.",
      iconColor: colors.gold100,
      backgroundImage: 'url("https://media.istockphoto.com/id/2028549105/fr/photo/woman-practicing-yoga-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=rbQnuvqQ2Yk7ddnN86lR35b6T7gbyt-DksmR0D0qjio=")',
      textColor: 'white'
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 2c.5 1.5 1 3 1 5s-.5 3.5-1 5c-.5 1.5-1 3-1 5h2c0-2 1-4 1.5-5.5.5-1.5 1-3 1-5s-.5-3.5-1-5c-.5-1.5-1-3-1-5H7z"/>
          <path d="M17 2c-.5 1.5-1 3-1 5s.5 3.5 1 5c.5 1.5 1 3 1 5h-2c0-2-1-4-1.5-5.5-.5-1.5-1-3-1-5s.5-3.5 1-5c.5-1.5 1-3 1-5h2z"/>
          <line x1="12" y1="2" x2="12" y2="22" strokeWidth="1"/>
        </svg>
      ),
      title: "Alimentation Saine",
      description: "Cuisine méditerranéenne bio préparée avec des ingrédients locaux et de saison.",
      iconColor: colors.gold100,
      backgroundImage: 'url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
      textColor: 'white'
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h3.5l2.5-8 5 16 2.5-8H21"/>
        </svg>
      ),
      title: "Sport",
      description: "Activités physiques douces adaptées à tous les niveaux pour revitaliser votre corps.",
      iconColor: colors.gold100,
      backgroundImage: 'url("https://images.pexels.com/photos/864939/pexels-photo-864939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
      textColor: 'white'
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
          <path d="M20 10l-1.5 1.5L17 13l1.5 1.5L20 16l1.5-1.5L23 13l-1.5-1.5L20 10z"/>
          <path d="M4 10l-1.5 1.5L1 13l1.5 1.5L4 16l1.5-1.5L7 13l-1.5-1.5L4 10z"/>
        </svg>
      ),
      title: "Massage",
      description: "Soins relaxants et thérapeutiques pour libérer les tensions et retrouver l'équilibre.",
      iconColor: colors.gold100,
      backgroundImage: 'url("https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
      textColor: 'white'
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      title: "Session de développement",
      description: "Un moment de guidante et de partage. Permet de libérer ce qui pèse, avec des clés concrètes pour retrouver une énergie motivante qui éclaire votre chemin vers le bonheur.",
      iconColor: colors.gold100,
      backgroundImage: 'url("https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
      textColor: 'white'
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      title: "Pratique de pleine conscience",
      description: "Un moment de douceur et d'ouverture vers la sérénité et la clarité intérieure. Accompagné d'une musique apaisante.",
      iconColor: colors.gold100,
      backgroundImage: 'url("https://images.pexels.com/photos/3820360/pexels-photo-3820360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
      textColor: 'white'
    }
  ];

  return (
    <section id="programme" className="py-20" style={{ backgroundColor: colors.beige50 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <Card
                key={program.title}
                className="bg-white border-0 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300 min-h-[300px] flex flex-col relative overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), ${program.backgroundImage}`,
                    zIndex: 0,
                  }}
                />
                <CardHeader className="text-center pb-4 relative z-10">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      color: program.iconColor
                    }}
                  >
                    <IconComponent width={32} height={32} />
                  </div>
                  <CardTitle className="text-xl font-serif" style={{ color: program.textColor }}>
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center relative z-10">
                  <CardDescription className="text-center leading-relaxed" style={{ color: program.textColor }}>
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
