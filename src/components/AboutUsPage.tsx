import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, CheckCircle, Users, Briefcase, Target, Award } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section with Parallax Effect */}
        <section className="relative bg-primary/5 py-24 md:py-32 px-4 md:px-8 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.2)'
            }}
          />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center"
            >
              <Badge className="mb-6 px-4 py-1.5 bg-primary/20 text-white border-none text-sm">
                La nostra storia
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                Chi Siamo
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-white/90 text-lg md:text-xl leading-relaxed mb-8">
                Scopri la storia, i valori e la visione che guidano Brick By Brick Immobiliare
              </p>
            </motion.div>
          </div>
        </section>

        {/* Chi Siamo Section */}
        <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
            >
              <motion.div 
                className="md:col-span-6 rounded-2xl overflow-hidden h-[500px] shadow-2xl relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Brick By Brick Team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              <div className="md:col-span-6 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Chi siamo</h2>
                  <div className="w-20 h-1 bg-primary mb-8"></div>
                  <div className="space-y-6 text-gray-600 text-lg">
                    <p className="leading-relaxed">
                      Brick By Brick Immobiliare nasce con l'obiettivo di portare una ventata di freschezza e concretezza nel mondo della compravendita immobiliare.
                      Siamo un'agenzia giovane, ambiziosa e attenta, che opera su Torino e provincia offrendo un servizio completo, trasparente e costruito attorno alle esigenze reali delle persone.
                    </p>
                    <p className="leading-relaxed">
                      Sappiamo quanto sia importante sentirsi guidati e compresi quando si affronta una scelta così significativa come l'acquisto o la vendita di una casa. Per questo lavoriamo ogni giorno con passione, ascolto e competenza, costruendo relazioni basate sulla fiducia reciproca e su obiettivi condivisi.
                    </p>
                    <p className="leading-relaxed">
                      Il nostro nome, Brick By Brick, racconta già il nostro approccio: mattone dopo mattone, senza fretta ma con determinazione, costruiamo insieme a te il percorso ideale verso il tuo traguardo.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cosa Facciamo Section */}
        <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Cosa facciamo</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                Siamo specializzati nella vendita di nuove costruzioni e immobili completamente ristrutturati, ma trattiamo anche altre tipologie di immobili residenziali, su richiesta o in base alle esigenze del mercato. Collaboriamo con imprese, costruttori e privati selezionati per offrire ai nostri clienti solo il meglio.
              </p>
              <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed mt-4">
                Lavoriamo con criteri meritocratici e senza vincoli di zona: per noi conta il risultato, non i contini. Il nostro scopo è ottenere il massimo per ogni cliente, che sia un acquirente alla ricerca della prima casa, un investitore o un venditore che desidera valorizzare al meglio la propria proprietà.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            >
              <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full border-none">
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 p-4 rounded-2xl w-fit mb-6">
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-primary">
                      Nuove Costruzioni
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-lg">
                      Selezioniamo le migliori nuove costruzioni, con attenzione alla qualità dei materiali, all'efficienza energetica e alla posizione strategica.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full border-none">
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 p-4 rounded-2xl w-fit mb-6">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-primary">
                      Immobili Ristrutturati
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-lg">
                      Proponiamo immobili completamente rinnovati, dove tradizione e modernità si incontrano per creare spazi abitativi di qualità.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full border-none">
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 p-4 rounded-2xl w-fit mb-6">
                      <Briefcase className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-primary">
                      Consulenza Immobiliare
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-lg">
                      Offriamo un servizio di consulenza personalizzata per guidarti nelle scelte più importanti, sia che tu stia acquistando o vendendo un immobile.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* La Nostra Mission Section */}
        <section className="py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
            >
              <div className="space-y-8 order-2 md:order-1 md:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">La nostra mission</h2>
                  <div className="w-20 h-1 bg-primary mb-8"></div>
                  <div className="space-y-6 text-gray-600 text-lg">
                    <p className="leading-relaxed">
                      La nostra missione è semplice ma ambiziosa: rendere il mercato immobiliare più accessibile, chiaro e umano.
                      Vogliamo che ogni cliente possa affrontare una compravendita con serenità, sentendosi accompagnato da un team competente, onesto e realmente interessato al suo obiettivo.
                    </p>
                    <p className="leading-relaxed">
                      Crediamo che il valore di un'agenzia non si misuri solo nelle vendite, ma nella qualità del percorso fatto insieme. Per questo mettiamo al centro l'ascolto, la trasparenza e l'innovazione, offrendo un servizio moderno, flessibile e costruito su misura.
                    </p>
                  </div>
                  <motion.div 
                    className="pt-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button asChild className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto">
                      <Link to="/properties" className="flex items-center gap-3">
                        Scopri i nostri immobili
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div 
                className="rounded-2xl overflow-hidden h-[500px] shadow-2xl order-1 md:order-2 md:col-span-7 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="La nostra missione"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Cosa Ci Distingue Section */}
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cosa ci distingue</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
                Ciò che ci rende unici è il nostro approccio al cliente e al mercato immobiliare
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mt-12"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Un approccio giovane e concreto</h3>
                  <p className="text-gray-600">Parliamo chiaro, agiamo in fretta, lavoriamo con passione.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Servizi su misura</h3>
                  <p className="text-gray-600">Ogni operazione è cucita sulle reali esigenze del cliente.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Nessun vincolo di zona</h3>
                  <p className="text-gray-600">Operiamo su tutto il territorio di Torino e provincia, valutando ogni opportunità senza limiti.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Focus su qualità</h3>
                  <p className="text-gray-600">Selezioniamo solo soluzioni di qualità, con un occhio attento al valore nel tempo.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Un rapporto diretto e continuo</h3>
                  <p className="text-gray-600">Dal primo contatto alla consegna delle chiavi, siamo sempre presenti.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Meritocrazia e fiducia</h3>
                  <p className="text-gray-600">Puntiamo sul risultato, non sulle promesse.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Perché Sceglierci Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Perché sceglierci</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
                I motivi per cui i nostri clienti ci scelgono e continuano a raccomandarci
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            >
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-primary">
                    Esperienza personalizzata
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ogni cliente è seguito in modo unico, con strategie su misura per le sue esigenze specifiche.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-primary">
                    Trasparenza assoluta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Comunichiamo in modo chiaro, diretto e sincero, sempre. Nessuna sorpresa, solo chiarezza.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-primary">
                    Competenza aggiornata
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Conosciamo il mercato e ci formiamo continuamente per offrirti sempre il miglior servizio possibile.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-primary">
                    Tempistiche rapide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Puntiamo all'efficienza, riducendo i tempi senza perdere qualità nel servizio offerto.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-primary">
                    Supporto completo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ti accompagniamo in ogni fase, dalla valutazione iniziale al rogito, con assistenza continua.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;