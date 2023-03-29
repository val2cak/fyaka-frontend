import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { Routes } from '../../routes/Routes';
import { getUserFromStorage } from '../../services/storage';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

interface Props {
  name: string;
}

const Links: FC<Props> = ({ name }) => {
  const userJson: string | null = getUserFromStorage();

  const [isLoggedIn, setIsLoggedIn] = useState(
    userJson !== null ? true : false
  );

  return (
    <ul className='flex justify-center items-center gap-10 first:pl-16 last:pr-16 text-md font-ubuntu'>
      {Routes.find((item) => item.name === 'Dashboard')
        ?.children?.find((child) => child.name === name)
        .children.map((route, index) => (
          <li key={index} className='lowercase flex'>
            {route.name !== 'Profil' ? (
              <NavLink
                to={route.path !== undefined ? route.path : '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'font-bold border-b-4 pb-1'
                    : 'font-regular border-b-4 border-transparent pb-1 delay-50 hover:font-bold hover:border-lightColor duration-100'
                }
              >
                {!route.invisible && route.name !== undefined && route.name}
              </NavLink>
            ) : (
              <>
                {!isLoggedIn ? (
                  <NavLink
                    to='/auth/get-started'
                    className={
                      'font-regular pb-1 delay-50 hover:font-bold hover:border-lightColor border-transparent border-b-4 duration-100'
                    }
                  >
                    prijava
                  </NavLink>
                ) : (
                  <ProfileMenu
                    routes={route.children}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                )}
              </>
            )}
          </li>
        ))}
    </ul>
  );
};

export default Links;
