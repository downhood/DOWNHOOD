'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Lazy load DesignCanvas (to avoid SSR issues if using DOM/image APIs)
const DesignCanvas = dynamic(() => import('@/components/DesignCanvas'), {
  ssr: false,
});

export default function Page() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedStyle, setSelectedStyle] = useState('hoodie');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Removed duplicate heading from here */}

      <DesignCanvas
        selectedColor={selectedColor}
        selectedStyle={selectedStyle}
        uploadedImage={uploadedImage}
      />
    </div>
  );
}
