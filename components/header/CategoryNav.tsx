import React from 'react';
import Link from 'next/link';
import { productNav } from '@/constant/navigation';

export default function CategoryNav() {
  return (
    <ul className="product-nav" data-testid="product-nav">
      {productNav.map((link, index) => {
        return (
          <li key={index}>
            <Link href={`/${link.display}`} key={link.display}>
              {link.display}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
