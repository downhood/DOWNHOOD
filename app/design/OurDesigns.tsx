
'use client';

interface OurDesignsProps {
  onSelectDesign: (design: string) => void;
}

export default function OurDesigns({ onSelectDesign }: OurDesignsProps) {
  const designs = [
    {
      id: 1,
      name: 'Skull Art',
      image: 'https://readdy.ai/api/search-image?query=Cool%20skull%20design%2C%20gothic%20artwork%2C%20black%20and%20white%20skull%20illustration%2C%20edgy%20t-shirt%20design%2C%20detailed%20skull%20art%2C%20rock%20style%20graphics&width=200&height=200&seq=design1&orientation=squarish'
    },
    {
      id: 2,
      name: 'Mountain Peak',
      image: 'https://readdy.ai/api/search-image?query=Mountain%20landscape%20design%2C%20minimalist%20mountain%20silhouette%2C%20nature%20graphic%2C%20outdoor%20adventure%20design%2C%20geometric%20mountains%2C%20hiking%20themed%20art&width=200&height=200&seq=design2&orientation=squarish'
    },
    {
      id: 3,
      name: 'Urban Graffiti',
      image: 'https://readdy.ai/api/search-image?query=Urban%20graffiti%20design%2C%20street%20art%20style%2C%20colorful%20spray%20paint%20effect%2C%20hip%20hop%20culture%20graphics%2C%20modern%20city%20art%2C%20youth%20fashion%20design&width=200&height=200&seq=design3&orientation=squarish'
    },
    {
      id: 4,
      name: 'Vintage Car',
      image: 'https://readdy.ai/api/search-image?query=Vintage%20classic%20car%20design%2C%20retro%20automobile%20illustration%2C%20muscle%20car%20graphics%2C%20automotive%20art%2C%20classic%20vehicle%20design%2C%20garage%20culture&width=200&height=200&seq=design4&orientation=squarish'
    },
    {
      id: 5,
      name: 'Space Galaxy',
      image: 'https://readdy.ai/api/search-image?query=Space%20galaxy%20design%2C%20cosmic%20nebula%20artwork%2C%20stars%20and%20planets%2C%20universe%20themed%20graphics%2C%20astronaut%20design%2C%20sci-fi%20space%20art&width=200&height=200&seq=design5&orientation=squarish'
    },
    {
      id: 6,
      name: 'Tribal Pattern',
      image: 'https://readdy.ai/api/search-image?query=Tribal%20pattern%20design%2C%20ethnic%20geometric%20patterns%2C%20traditional%20tribal%20art%2C%20cultural%20motifs%2C%20black%20line%20art%2C%20indigenous%20design&width=200&height=200&seq=design6&orientation=squarish'
    },
    {
      id: 7,
      name: 'Wolf Pack',
      image: 'https://readdy.ai/api/search-image?query=Wolf%20pack%20design%2C%20wild%20animal%20artwork%2C%20howling%20wolf%20illustration%2C%20nature%20wildlife%20graphics%2C%20forest%20animals%2C%20pack%20hunting%20theme&width=200&height=200&seq=design7&orientation=squarish'
    },
    {
      id: 8,
      name: 'Music Notes',
      image: 'https://readdy.ai/api/search-image?query=Music%20notes%20design%2C%20musical%20symbols%2C%20treble%20clef%20artwork%2C%20rhythm%20graphics%2C%20band%20music%20theme%2C%20musical%20instrument%20silhouettes&width=200&height=200&seq=design8&orientation=squarish'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {designs.map((design) => (
        <div 
          key={design.id}
          onClick={() => onSelectDesign(design.image)}
          className="cursor-pointer bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
        >
          <div className="aspect-square rounded-md overflow-hidden mb-2">
            <img 
              src={design.image} 
              alt={design.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-center text-gray-200">{design.name}</p>
        </div>
      ))}
    </div>
  );
}
