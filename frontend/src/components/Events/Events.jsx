import React from 'react';
import styles from '../../styles/styles'; // Styles import karna zaroori hai
import EventCard from "./EventCard"; // EventCard ko yahan import karein

const Events = () => {
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>

        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default Events; // Ye line error 'module has no exports' ko khatam karegi