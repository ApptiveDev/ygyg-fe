export const getCardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        thumbnail: "https://via.placeholder.com/150",
        title: "르네디종 홀그레인 머스타드",
        price: "12,000원",
        meetingDate: "10월 16일 19시 30분",
        min: 4, 
        max: 8,
        current: 6, 
      });
    }, 500); 
  });
};