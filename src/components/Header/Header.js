import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { getRoutes } from './helpers';
import styles from './styles.scss';
import { cntcl } from '../../helpers/app';


export default function Header() {
  
  return (
    <div>
      <AppBar position="fixed" className={styles.header}>
        <Toolbar className={styles.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap >
            Auto
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        classes={cntcl('paper', styles.drawer)}
        open
      >
        <div className={styles.drawer__content}>
          <List>{getRoutes()}</List>
        </div>
      </Drawer>
    </div>
  );
}