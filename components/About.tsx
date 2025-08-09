import { Heart, Star, Flower, Sun } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 mb-6 shadow-xl">
            <Heart className="text-amber-700" size={36} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            Bienvenue à{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-stone-800">
              AMA RETREAT
            </span>
          </h2>
          <p className="text-2xl md:text-3xl font-serif text-stone-800 italic mb-8 leading-relaxed">
            Un espace sacré pour vous reconnecter à vous-même… et à
            l&apos;essentiel.
          </p>
        </div>

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
            <span className="text-amber-600">🌿</span>
            <Flower className="text-amber-600" size={24} />
          </div>

          <p className="text-lg text-stone-800 leading-relaxed text-center">
            Que vous ayez besoin de paix intérieure, d&apos;un souffle nouveau
            ou d&apos;explorer des pratiques de pleine conscience, notre mission
            est de vous accompagner avec douceur dans un processus de
            transformation profonde — <strong>mentale, émotionnelle et physique</strong> — vers une vie plus alignée et harmonieuse.
          </p>
        </div>

        {/* Pourquoi choisir AMA RETREAT */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-amber-100 to-stone-100 rounded-2xl p-8 shadow-xl border border-amber-200/30 transition-all duration-300 ease-in-out hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center shadow-lg">
                <Sun className="text-white" size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 ml-4">
                Pourquoi choisir AMA RETREAT ?
              </h3>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-serif font-semibold text-amber-700 mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center mr-3">
                  🌀
                </span>
                Nos objectifs :
              </h4>
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
              </ul>
            </div>
          </div>

          {/* Ce qui vous attend */}
          <div className="bg-gradient-to-br from-amber-100 to-stone-100 rounded-2xl p-8 shadow-xl border border-amber-200/30 transition-all duration-300 ease-in-out hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-stone-700 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🧘‍♀️</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 ml-4">
                Ce qui vous attend
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-stone-800 mb-4">
                  <strong>Durée :</strong> de 3 à 5 jours selon les formats
                  (week-end, séjour court ou semaine complète)
                  <br />
                  <strong>Lieu :</strong> un écrin de nature, loin du tumulte,
                  pour favoriser le calme, l&apos;écoute et la contemplation
                </p>
              </div>

              <div>
                <h4 className="text-xl font-serif font-semibold text-amber-700 mb-4 flex items-center">
                  <span className="text-2xl mr-2">✨</span>
                  Au programme :
                </h4>
                <ul className="space-y-2 text-stone-800">
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
              </div>
            </div>
          </div>
        </div>

        {/* Pour qui */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl mb-12 border border-amber-200/30">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-stone-800 mb-4">
              <span className="text-white text-2xl">💖</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-4">
              Ce séjour est fait pour vous si vous souhaitez :
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Faire une vraie pause loin du quotidien",
              "Prendre du temps pour vous, sans culpabilité",
              "Recharger vos batteries en profondeur",
              "Faire de belles rencontres, dans une ambiance chaleureuse et bienveillante",
            ].map((text, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mt-1">
                  <span className="text-white text-sm">•</span>
                </div>
                <span className="text-stone-800">{text}</span>
              </div>
            ))}
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
            Et nous sommes là pour en prendre soin, avec vous, pas à pas 🌺
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
