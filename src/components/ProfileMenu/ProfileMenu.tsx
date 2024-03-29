import { FC, useEffect, useState } from 'react';
import {
  BsChevronDown as ArrowDownIcon,
  BsChevronUp as ArrowUpIcon,
} from 'react-icons/bs';
import {
  BsFillPersonLinesFill as ProfileOpenIcon,
  BsFillPersonXFill as ProfileClosedIcon,
} from 'react-icons/bs';
import { RiLogoutCircleRLine as LogoutIcon } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';

import { CustomRouteObject } from '../../types/typeDefinitions';
import { removeUserFromStorage } from '../../services/storage';
import { useAppDispatch } from '../../app/hooks';
import { logoutUser } from '../../features/auth/authStateSlice';
import useNotifications from '../../hooks/useNotifications';

interface Props {
  routes: CustomRouteObject[];
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu: FC<Props> = ({ routes, setIsLoggedIn }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const navigateTo = useNavigate();

  const { handleUserActionNotification } = useNotifications();

  const handleLogout = () => {
    removeUserFromStorage();
    dispatch(logoutUser());
    navigateTo('/');
    setIsLoggedIn(false);
    handleUserActionNotification({
      message: 'Doviđenja!',
      autoClose: 2500,
      type: 'success',
    });
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main>
      <button
        onMouseEnter={() => !isMobile && setOpen(true)}
        onClick={() => isMobile && (open ? setOpen(false) : setOpen(true))}
        className='flex justify-center items-center gap-2 pb-2'
      >
        {isMobile ? (
          open ? (
            <ProfileClosedIcon className='text-[28px]' />
          ) : (
            <ProfileOpenIcon className='text-[28px]' />
          )
        ) : (
          'profil'
        )}
        {!isMobile && (open ? <ArrowUpIcon /> : <ArrowDownIcon />)}
      </button>

      {open && (
        <ul
          onMouseLeave={() => setOpen(false)}
          className='absolute sm:w-[80vw] sm:h-screen z-[10] bg-primaryColor pb-16 sm:pt-12 pt-4 sm:px-12 px-24 right-0 top-16 bg-opacity-90 flex flex-col gap-2 items-start'
        >
          {routes
            ?.filter((route) => !route.invisible)
            ?.map((item, index) => (
              <li key={index} className='lowercase flex'>
                <NavLink
                  to={item.path !== undefined ? item.path : '/'}
                  className={({ isActive }) =>
                    isActive
                      ? 'font-bold border-b-4 pb-1 flex flex-row justify-center items-center gap-8'
                      : 'font-regular delay-50 hover:font-bold hover:border-lightColor border-transparent border-b-4 duration-100 pb-1 flex flex-row justify-center items-center gap-8'
                  }
                >
                  {item.icon && <item.icon />}
                  {item.name !== undefined && item.name}
                </NavLink>
              </li>
            ))}
          <button
            onClick={handleLogout}
            className='font-regular delay-50 hover:font-bold hover:border-lightColor border-transparent border-b-4 duration-100 pb-1 flex flex-row justify-center items-center gap-8'
          >
            <LogoutIcon className='text-md' />
            odjava
          </button>
        </ul>
      )}
    </main>
  );
};

export default ProfileMenu;
