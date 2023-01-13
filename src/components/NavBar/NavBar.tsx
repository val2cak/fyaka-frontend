import { List } from '@mui/material';
import Links from './Links';
import Logo from './Logo';

const NavBar = () => {
  return (
    <List sx={{ display: 'flex' }}>
      <Links />
      <Logo />
      <Links />
    </List>
  );
};

export default NavBar;
