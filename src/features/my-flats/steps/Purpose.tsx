import Image from 'next/image';
import { useState } from 'react';

const purposes = [
  {
    id: 1,
    value: 'sell',
    label: 'Sell My Flat',
    src: '/illustrators/sell.svg',
  },
  {
    id: 2,
    value: 'rent',
    label: 'Rent My Flat',
    src: '/illustrators/rent.svg',
  },
];
export const Purpose = () => {
  const [purpose, setPurpose] = useState('');
  return (
    <div className='m-auto flex h-auto  w-auto gap-9'>
      {purposes.map((p) => {
        return (
          <div key={p.id} onClick={() => setPurpose(p.value)}>
            <div
              className={` hover:bg-primary-main duration-400 h-[350px] w-[300px]  cursor-pointer rounded-lg ${
                purpose == p.value ? 'bg-primary-main' : 'bg-slate-100'
              } text-center shadow-md transition-colors hover:opacity-80`}
            >
              <div className='relative h-[300px] w-full object-cover'>
                <Image src={p.src} fill alt={p.label} />
              </div>
              <div className='flex flex-col justify-center align-middle'>
                <h3 className=' p-1 text-[30px] font-semibold text-blue-950'>
                  {p.label}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};