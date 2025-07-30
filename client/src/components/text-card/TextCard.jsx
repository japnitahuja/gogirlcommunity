import "./TextCard.css";

const TextCard = ({ icon, text }) => {
  return (
    <div className="text-card">
      <span className="text-card-icon">{icon}</span>
      <span className="text-card-text">{text}</span>
    </div>
  );
};

export default TextCard;
