import { FC, Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

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
    <ul className='flex sm:justify-between justify-center items-center sm:gap-7 gap-10 sm:pt-4 sm:first:pl-2 sm:last:pr-2 first:pl-16 last:pr-16 text-md font-ubuntu'>
      {Routes.find((item) => item.name === 'Dashboard')
        ?.children?.find((child) => child.name === name)
        .children.map((route, index) => (
          <Fragment key={index}>
            {!route?.invisible && (
              <li className='lowercase flex'>
                {route.name !== 'Profil' ? (
                  <NavLink
                    to={route.path !== undefined ? route.path : '/'}
                    className={({ isActive }) =>
                      isActive
                        ? 'font-bold sm:border-b-2 border-b-4 pb-1'
                        : 'font-regular sm:border-b-2 border-b-4 border-transparent pb-1 delay-50 hover:font-bold hover:border-lightColor duration-100'
                    }
                  >
                    {isMobile ? (
                      <route.icon className='text-[28px]' />
                    ) : (
                      route.name
                    )}
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
            )}
          </Fragment>
        ))}
    </ul>
  );
};

export default Links;
