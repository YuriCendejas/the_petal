const CENTER = { x: 150, y: 130 };                         // middle of the flower head; every petal rotates around this point

export default function Flower({ flower }) {               // receives the flower data from App as a prop
  if (!flower) return <p>Loading...</p>;                   // before the first API answer arrives, show a placeholder

  const { totalPetals, petalsLeft, prevLeft, mood } = flower; // unpack the values we need; prevLeft = petals we saw last time

  return (
    <div className="flower-card">
      {/* the SVG is the drawing; viewBox is its own coordinate system, so it scales to any screen size */}
      <svg viewBox="0 0 300 420" className="flower-svg" aria-label="Your flower">
        {/* mood is "blooming", "wilting" or "dying", and the CSS tilts the plant based on it */}
        <g className={`plant ${mood}`}>
          {/* the stem: a curved line from under the flower head down to the bottom */}
          <path className="stem" d="M150 150 C150 250 150 320 150 400" />
          {/* two leaves, drawn as closed curved shapes */}
          <path className="leaf" d="M150 300 C110 280 90 300 80 320 C110 330 135 320 150 300Z" />
          <path className="leaf" d="M150 340 C190 320 215 335 225 355 C195 365 165 360 150 340Z" />

          {/* build one petal for each number from 0 to totalPetals - 1 */}
          {Array.from({ length: totalPetals }, (_, i) => {
            let state = "";                                  // default: the petal is still on the flower
            if (i >= petalsLeft) state = i >= prevLeft ? "gone" : "falling"; // lost petals: if we already saw them gone, hide them, otherwise play the fall animation

            return (
              // key helps React track each petal; the state class picks the CSS animation
              <g key={i} className={`petal-wrap ${state}`}>
                <ellipse
                  className="petal"                          // gives it the pink color
                  cx={CENTER.x}                              // horizontal center of the petal
                  cy="80"                                    // sits above the flower center
                  rx="24"                                    // half the petal's width
                  ry="50"                                    // half the petal's height
                  transform={`rotate(${(360 / totalPetals) * i} ${CENTER.x} ${CENTER.y})`} // spreads petals evenly around a circle
                />
              </g>
            );
          })}

          {/* the yellow center is drawn last so it sits on top of the petals */}
          <circle className="center" cx={CENTER.x} cy={CENTER.y} r="26" />
        </g>
      </svg>
      {/* plain text summary under the drawing */}
      <p>{petalsLeft} of {totalPetals} petals left ({mood})</p>
    </div>
  );
}