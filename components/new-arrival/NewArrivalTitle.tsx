import React from 'react';
import Link from 'next/link';
import BaseButton from '../buttons/BaseButton';

export default function NewArrivalTitle() {
  return (
    <div className="new-arrival__title">
      <h1>New Arrival</h1>
      <Link href={'/'}>
        <BaseButton>View more</BaseButton>
      </Link>
    </div>
  );
}
