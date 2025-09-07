// ./components/About.tsx

import { Star, Sun, Flower,  Leaf, Trees } from "lucide-react";

const About = () => {
  // Corrected: The 'forYouList' variable is now used in the JSX below.


  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Introduction */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl mb-12 border border-amber-200/30">
          <p className="text-lg md:text-xl text-stone-800 leading-relaxed text-center mb-8">
            Offrez-vous une parenthèse hors du temps, un moment privilégié pour
            vous recentrer, vous ressourcer et retrouver votre équilibre
            intérieur.
            <br />
            <br />
            <span className="font-serif text-xl md:text-2xl text-amber-700 italic">
              AMA RETREAT est une invitation à revenir à soi, à ralentir, à
              écouter, à ressentir.
            </span>
          </p>

          <div className="flex items-center justify-center space-x-2 text-2xl mb-6">
            <Flower className="text-amber-600" size={24} />
            <Trees className="text-green-600" size={24} />
            <Flower className="text-amber-600" size={24} />
          </div>

          <p className="text-lg text-stone-800 leading-relaxed text-center">
            Que vous ayez besoin de paix intérieure, d&apos;un souffle nouveau
            ou d&apos;explorer des pratiques de pleine conscience, notre mission
            est de vous accompagner avec douceur dans un processus de
            transformation profonde — <strong>mentale, émotionnelle et physique</strong> — vers une vie plus alignée et harmonieuse.
          </p>
        </div>

        {/* Combined "Nos objectifs" and "Ce qui vous attend" card */}
        <div className="bg-gradient-to-br from-amber-100 to-stone-100 rounded-2xl p-8 shadow-xl border border-amber-200/30 transition-all duration-300 ease-in-out hover:scale-105 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
              Nos objectifs & Ce qui vous attend
            </h3>
          </div>

          {/* Section: Nos objectifs */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center shadow-lg">
                <Sun className="text-white" size={20} />
              </div>
              <h4 className="text-xl font-serif font-semibold text-amber-700 ml-4">
                Nos objectifs :
              </h4>
            </div>
            <ul className="space-y-3 text-stone-800">
              <li className="flex items-start">
                <span className="text-amber-600 font-bold mr-3">•</span>
                Réduire le stress et l&apos;anxiété, retrouver un ancrage
                profond
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 font-bold mr-3">•</span>
                Prendre soin de soi à travers des pratiques physiques,
                mentales et spirituelles
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 font-bold mr-3">•</span>
                Renforcer sa santé globale, mentale et corporelle
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 font-bold mr-3">•</span>
                Offrir un espace d&apos;introspection et de reconnexion
                véritable à soi-même
              </li>
               <li className="flex items-start">
                <span className="text-amber-600 font-bold mr-3">•</span>
               Recharger vos batteries en profondeur
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 font-bold mr-3">•</span>
               Faire une vraie pause loin du quotidien
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 font-bold mr-3">•</span>
               Faire de belles rencontres, dans une ambiance chaleureuse et bienveillante
              </li>
            </ul>
          </div>

          {/* Section: Ce qui vous attend */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-stone-700 flex items-center justify-center shadow-lg">
                <Star className="text-white" size={20} />
              </div>
              <h4 className="text-xl font-serif font-semibold text-stone-700 ml-4">
                Ce qui vous attend :
              </h4>
            </div>
            <div className="space-y-6 text-stone-800">
              <p>
                <strong>Durée :</strong> de 3 à 5 jours selon les formats
                (week-end, séjour court ou semaine complète)
                <br />
                <strong>Lieu :</strong> un écrin de nature, loin du tumulte,
                pour favoriser le calme, l&apos;écoute et la contemplation
              </p>
              {/*<div>
                <h4 className="text-xl font-serif font-semibold text-amber-700 mb-4 flex items-center">
                  <CalendarDays className="text-amber-600 w-6 h-6 mr-2" />
                  Au programme :
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-3">•</span>
                    Séances de yoga en pleine nature
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-3">•</span>
                    Méditations guidées &amp; marche consciente
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-3">•</span>
                    Ateliers de développement personnel et de gestion du stress
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-3">•</span>
                    Soins énergétiques &amp; massages intuitifs
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-3">•</span>
                    Alimentation saine, locale et adaptée à vos besoins
                  </li>
                </ul>
              </div>*/}
            </div>
          </div>
        </div>

       
        {/* Message final */}
        <div className="text-center bg-gradient-to-r from-amber-600 to-stone-800 rounded-2xl p-8 md:p-12 text-white shadow-xl">
          <div className="mb-6">
            <Star className="mx-auto text-amber-200" size={40} />
          </div>
          <p className="text-xl md:text-2xl font-serif leading-relaxed mb-4">
            AMA RETREAT n&apos;est pas un simple séjour.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            C&apos;est une <strong>expérience</strong>. Une reconnexion à votre
            corps, à votre âme, à votre vérité intérieure.
          </p>
          <p className="text-lg md:text-xl font-serif italic">
            Et nous sommes là pour en prendre soin, avec vous, pas à pas <Leaf className="inline-block ml-1 text-amber-600" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;