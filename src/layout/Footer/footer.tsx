import React from "react";

export const Footer = () => {
  const Footer = 'Footer';

  return (
    <footer className="app-container z-50 flex w-full items-center justify-between py-4">
      <div className="flex flex-col space-y-3 ">
        <span className=''>© Создан в 2018 году, DE LA MANO.</span>
        <span className="text-sm opacity-75">
         Вдохновение в каждом стежке...
        </span>
          <a href='mailto:snkr.nk95@gmail.com'>snkr.nk95@gmail.com</a>
          <a href='tel:+7 917 857-26-69'>+7 917 857-26-69</a>
      </div>
    </footer>
  );
};
