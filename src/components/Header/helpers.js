import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { Link } from 'react-router-dom';
import { getMenuRouter } from "../../containers/Router";
import { ListSubheader } from '@material-ui/core';

export function getRoutes() {
  const groups = getMenuRouter();
  return (
    <React.Fragment>
      {
        Object.keys(groups).map((group) => {
          if (!groups[group].length) return;
          return (
            <React.Fragment key={`menu-${group}`}>
              { group !== 'notgrouped' && (
                <React.Fragment>
                  <ListSubheader color="primary">{group}</ListSubheader>
                </React.Fragment>
              )}
              { groups[group].map((item, index) => {
                const { title = 'noname', path = '/', icon: Icon } = item;
                return (
                  <Link key={`menu-${group}-${index}`} to={path}>
                    <ListItem button>
                      <ListItemIcon>
                        <Icon/>
                      </ListItemIcon>
                      <ListItemText primary={title} />
                    </ListItem>
                  </Link>
                );
              })}
              <Divider />
            </React.Fragment>
          );
        })
      }
    </React.Fragment>
  );
}