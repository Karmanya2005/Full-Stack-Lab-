function CharacterCounter({ count, limit }) {
  const remaining = limit - count;

  return (
    <div className="counter-container">
      <div className="counter-bar">
        <div
          className="counter-progress"
          style={{
            width: `${Math.min((count / limit) * 100, 100)}%`,
          }}
        ></div>
      </div>

      <p className={remaining < 20 ? "counter warning" : "counter"}>
        {count} / {limit} characters
      </p>
    </div>
  );
}

export default CharacterCounter;