import React from 'react';
import Image from 'next/image';

export default function ProductImg({ image }: { image: string }) {
  return <Image src={image} alt="" width={190} height={290} />;
}
