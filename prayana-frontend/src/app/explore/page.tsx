'use client';
import { useRouter } from 'next/navigation';
import { Compass, Sparkles } from 'lucide-react';

const TOP_PLACES = [
  {
    name: 'Paris, France',
    desc: 'A beautiful city famous for the Eiffel Tower, art museums, and delicious sweet bakeries.',
    image: '/images/paris.jpg'
  },
  {
    name: 'Tokyo, Japan',
    desc: 'An exciting city with huge bright electronic streets, old shrines, and amazing sushi food.',
    image: '/images/tokyo.jpg'
  },
  {
    name: 'Rome, Italy',
    desc: 'A historic city full of very old buildings, amazing history, pizza, and Italian ice cream.',
    image: '/images/rome.jpg'
  },
  {
    name: 'New York, USA',
    desc: 'A large crowded city with tall skyscrapers, big beautiful central parks, and busy theaters.',
    image: '/images/newyork.jpg'
  },
  {
    name: 'Bali, Indonesia',
    desc: 'A tropical island with peaceful green rice fields, sunny beaches, and local cultural temples.',
    image: '/images/bali.avif'
  },
  {
    name: 'London, UK',
    desc: 'A big historical place with royal castles, big red buses, and beautiful museums.',
    image: '/images/london.jpg'
  },
  {
    name: 'Sydney, Australia',
    desc: 'A sunny harbor city famous for its unique Opera House and beautiful sand surfing beaches.',
    image: '/images/sydney.webp'
  },
  {
    name: 'Dubai, UAE',
    desc: 'A luxury modern desert city with the tallest buildings, large shopping malls, and sand dunes.',
    image: '/images/dubai.jpg'
  },
  {
    name: 'Cape Town, South Africa',
    desc: 'A stunning coastal place with huge flat mountains, vineyards, and wild penguin beaches.',
    image: '/images/capetown.jpeg'
  },
  {
    name: 'Bangkok, Thailand',
    desc: 'A busy bright city with golden palaces, boat rivers, and tasty hot street food markets.',
    image: '/images/bangkok.jpg'
  }
];

export default function ExplorePage() {
  const router = useRouter();

  const handlePlanTrip = (placeName: string) => {
    router.push(`/trips/new?destination=${encodeURIComponent(placeName)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F4C81] mb-2">Top 10 Global Tourism Places</h1>
        <p className="text-sm sm:text-base text-slate-500">Discover incredible destinations and create an automated schedule instantly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {TOP_PLACES.map((place, idx) => (
          <div key={idx} className="bg-white border border-slate-100 shadow-md rounded-2xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <span className="absolute text-xs font-semibold bg-black/40 text-white px-2 py-1 rounded bottom-3 left-3">Destination #{idx + 1}</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#0F4C81] mb-2">{place.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{place.desc}</p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <button onClick={() => handlePlanTrip(place.name)} className="w-full bg-[#0F4C81] hover:bg-[#0c3d69] text-white rounded-xl py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                <Sparkles className="w-4 h-4" />
                <span>Plan Trip to {place.name.split(',')[0]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}