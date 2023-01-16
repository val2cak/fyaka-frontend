import { NavLink } from 'react-router-dom';
import { Routes } from '../../routes/Routes';

const Links = (props: { name: string }) => {
  return (
    <ul className='flex justify-center items-center gap-10 first:pl-10 last:pr-10 text-base font-primaryFont'>
      {Routes.find((item) => item.name === 'Dashboard')
        ?.children?.find((child) => child.name === props.name)
        .children.map((route, index) => (
          <li key={index} className='lowercase flex'>
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                isActive ? 'font-bold border-b-4' : undefined
              }
            >
              {!route.invisible && route.name}
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

export default Links;
