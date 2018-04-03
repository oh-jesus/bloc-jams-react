import React from 'react';

const Landing = () => (
  <section className="Landing">
   <h1 className="Hero-title"> Turn up the music!</h1>

    <section className="selling-points">
     <div className="point">
       <h2 className="point-title">Choose your music</h2>
       <p className="point-description">The world is full of music, why should you have to listen to music tbat someone else chose?</p>
     </div>
     <div className="point">
       <h2 className="point-title">Unlimited streaming, ad-free</h2>
       <p className="point-description">no arbitrary limits. No distractions.</p>
     </div>
     <div className="point">
       <h2 className="point-title">mobile enabled</h2>
       <p className="point-discription">Listen to your music on the go.</p>
     </div>
    </section>
  </section>
);

export default Landing;
