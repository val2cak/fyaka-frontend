import { NavLink } from 'react-router-dom';
import { Routes } from '../../routes/Routes';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Links = (props: { name: string }) => {
  return (
    <ul className='flex justify-center items-center gap-10 first:pl-16 last:pr-16 text-md font-ubuntu'>
      {Routes.find((item) => item.name === 'Dashboard')
        ?.children?.find((child) => child.name === props.name)
        .children.map((route, index) => (
          <li key={index} className='lowercase flex'>
            {route.name !== 'Profil' ? (
              <NavLink
                to={route.path !== undefined ? route.path : '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'font-bold border-b-4 py-1'
                    : 'font-regular py-2 hover:py-1 delay-50 hover:font-bold hover:border-b-4 duration-100'
                }
              >
                {!route.invisible && route.name !== undefined && route.name}
              </NavLink>
            ) : (
              <ProfileMenu routes={route.children} />
            )}
          </li>
        ))}
    </ul>
  );
};

export default Links;
