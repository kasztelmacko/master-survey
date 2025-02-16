import React from 'react';
import Image from 'next/image';

interface ItemCardProps {
  src: string;
  alt: string;
  name?: string;
  description?: string;
  kcal?: number;
  gram?: number;
  main_color?: string;
  brand_logo?: string;
  price?: number;
}

export default function ItemCard({
  src,
  alt,
  name,
  description,
  kcal,
  gram,
  main_color = '#ffffff',
  brand_logo,
  price,
}: ItemCardProps) {
  return (
    <div className="h-full relative group flex flex-col border rounded-lg shadow-md w-full max-w-xs mx-auto">
      {/* Image Section */}
      <div className="h-48 w-full relative">
        <Image
          className="rounded-t-lg w-full h-full object-cover"
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          draggable="false"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow mt-4 p-4">
        {name && (
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {name}
          </h5>
        )}
        {description && (
          <p className="mb-3 text-sm text-gray-700 overflow-hidden leading-4 flex-grow">
            {description}
          </p>
        )}
      </div>

      {/* Bottom Section with Kcal/Gram, Brand Logo, and Price */}
      {(brand_logo || kcal || gram || price !== undefined) && (
        <div
          className="p-4 rounded-b-lg grid grid-cols-3 items-center w-full"
          style={{ backgroundColor: main_color }}
        >
          {/* Left Side: Kcal and Gram */}
          {(kcal || gram) && (
            <div className="text-sm text-white font-bold justify-self-start">
              {gram && <div>{gram} g</div>}
              {kcal && <div>{kcal} kcal</div>}
            </div>
          )}

          {/* Middle: Brand Logo */}
          {brand_logo && (
            <div className="flex justify-center">
              <Image
                src={brand_logo}
                alt="Brand Logo"
                className="h-8 object-contain"
                width={32}
                height={32}
              />
            </div>
          )}

          {/* Right Side: Price */}
          <div className="text-white font-bold justify-self-end">
            <span className="text-2xl">{price !== undefined ? price : 'XXX'}</span>
            <span className="text-l"> zł</span>
          </div>
        </div>
      )}
    </div>
  );
}