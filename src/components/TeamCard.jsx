import React from 'react';
import { MdClose } from 'react-icons/md';

const TeamCard = ({ team, selected, onSelect, selectedTeams }) => {
  const handleSelect = () => {
    if (selected) {
      onSelect(team.id);
    } else {
      if (selectedTeams?.length < 2) {
        onSelect(team.id);
      }
    }
  };

  return (
    <div
      className={`relative   max-w-sm m-1  p-4 bg-white rounded-lg shadow-md ${
        selected ? 'bg-gray-800 text-white' : ''
      }`}
      onClick={handleSelect}>
      {selected && (
        <div className='absolute inset-0 bg-black opacity-25 rounded-lg' />
      )}
      <img
        src={team.img}
        alt={team.name}
        className={`w-[200px] h-[100px] mx-auto  shadow-md mb-2 ${
          selected ? 'opacity-50' : ''
        }`}
      />
      {selected && (
        <div className='absolute top-2 right-2'>
          <MdClose
            className='text-white text-xl cursor-pointer'
            onClick={() => onSelect(team.id)}
          />
        </div>
      )}
      <div className='text-center'>
        <h2
          className={` text-black text-lg font-semibold ${
            selected ? 'opacity-50' : ''
          }`}>
          {team.name}
        </h2>
      </div>
    </div>
  );
};

export default TeamCard;
