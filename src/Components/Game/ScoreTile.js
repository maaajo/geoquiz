import React from 'react';

const ScoreTile = ({ number, option }) => {
  return (
    <div
      className={`${
        option === 'good' ? `bg-lightGreen` : `bg-red`
      } text-white flex flex-col justify-center items-center w-20 h-16 rounded-lg shadow-lg mr-2`}
    >
      <p className="font-semibold text-2xl ">{number}</p>
      <p className="font-medium text-sm">
        {option === 'good' ? 'correct' : 'wrong'}
      </p>
    </div>
  );
};

export default ScoreTile;
