import ClockIcon from '../../assets/cardIcons/clock-icon.png.png'
import './Card.css';

interface CardProps {
  thumbnail: string;
  title: string;
  price: string;
  meetingDate: string;
  min: number;
  max: number;
  current: number;
}

const Card = ({ 
  thumbnail,
  title,
  price,
  meetingDate,
  min,
  max,
  current
 }: CardProps) => {
  
  const blocks = Array(10).fill(null);

    return (
        <div className="card">
            <div className="card-image">
                <img src={thumbnail} alt={title} />
                <div className="card-time">
                  <img src = {ClockIcon} alt = '' className = 'clock-icon'/>
                  {meetingDate}
                </div>
            </div>
            <div className="card-content">
                <div className="card-title">{title}</div>
                <div className="card-price">{price}</div>
                <div className="card-count-block">
                  {blocks.map((_, number) => {

                    let blockClass = "count-block";

                    if(number < current){
                      blockClass = blockClass + "active";
                    } else if(number + 1 === min){
                      blockClass = blockClass + "min";
                    } else if(number + 1 === max){
                      blockClass = blockClass + "max";
                    }

                    return (
                      <div className = {blockClass} key = {number}>
                        
                      </div>
                    );
                  })}
                </div>
            </div>
        </div>
    );
};

export default Card;
