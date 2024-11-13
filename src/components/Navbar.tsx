import { navLists } from '../constants';
import { appleImg, bagImg, searchImg } from '../utils';

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center py-5 px-5 sm:px-10 ">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="Apple" width={14} height={18} />
        <ul className="flex flex-1 gap-10 items-center justify-center max-sm:hidden">
          {navLists.map((item) => (
            <li
              className="text-gray cursor-pointer text-sm hover:text-white transition-all"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex gap-7 items-baseline max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="Search" width={18} height={18} />
          <img src={bagImg} alt="Bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
