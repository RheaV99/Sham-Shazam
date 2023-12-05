import React from 'react';
import '../style.css';
import '../play.css';
import Navbar from '../components/nav';
import { Record } from '../components/record';


const Play = () => {

  return (
    <div>
      <Navbar />

      <Record />
    </div>
  );
}

export default Play;
