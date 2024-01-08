const PointsDetail = ({ points }) => {
  return (
    <div>
      <h3>Points</h3>
      <ul>
        {points.map((point) => (
          <li key={point.id}>
            {point.point} - {point.description}
          </li>
        ))}
      </ul>
    </div>
  );
};