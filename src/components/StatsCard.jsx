import { TrendingUp } from 'lucide-react';

const StatsCard = ({ label, value, icon: Icon, trend, color = 'primary' }) => {
  const getColorClasses = () => {
    switch(color) {
      case 'success':
        return {
          bg: 'bg-success',
          text: 'text-success',
          gradient: 'bg-gradient-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning',
          text: 'text-warning',
          gradient: 'bg-gradient-warning'
        };
      case 'info':
        return {
          bg: 'bg-info',
          text: 'text-info',
          gradient: 'bg-gradient-info'
        };
      default:
        return {
          bg: 'bg-primary',
          text: 'text-primary',
          gradient: 'bg-gradient-primary'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className="card stat-card home-stats-card">
      <div className="stat-icon">
        {Icon ? <Icon size={32} /> : <TrendingUp size={32} />}
      </div>
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
      {trend && (
        <div className="stat-trend">
          <TrendingUp size={16} className="me-1" />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
