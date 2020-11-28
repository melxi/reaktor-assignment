import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/products/jackets">Jackets</Link></li>
        <li><Link to="/products/shirts">Shirts</Link></li>
        <li><Link to="/products/accessories">Accessories</Link></li>
      </ul>
    </nav>
  )
}
