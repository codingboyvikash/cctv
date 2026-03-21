const StatsCard = ({ label, value }) => {
  return (
    <div className="card stats-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
};

export default StatsCard;
