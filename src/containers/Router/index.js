import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import Router from './Router';
import { ORDERS_PATH } from '../../constants';
import Wrapper from '../../components/Wrapper';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DescriptionIcon from '@material-ui/icons/Description';
import OrderEdit from '../OrderEdit';
// import { lazy } from 'react';
// const Component = lazy(() => import('../Component'));

const TestComp = () => {
return (<div>test component <Link className="ref" to="/orders/1/edit">goto edit order</Link></div>)
}

export const defaultRouter = [
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/',
    component: TestComp,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: ORDERS_PATH,
    component: TestComp,
    group: 'Документы',
    title: 'Заказы',
    icon: DescriptionIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: `${ORDERS_PATH}:id/edit`,
    component: OrderEdit,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/doc2/',
    component: TestComp,
    group: 'Документы',
    title: 'Документ 2',
    icon: NotInterestedIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/test22/',
    component: TestComp,
    group: 'Раздел2',
    title: 'Тест',
    icon: NotInterestedIcon,
  },
];

const getRouter = () => {
  return defaultRouter.map((item) => {
    const { type, exact, path, component: Component } = item;
    return {
      type, 
      exact, 
      path, 
      component: () => (<Wrapper><Component/></Wrapper>)
    };
  });
};

export const getMenuRouter = () => {
  const groups = { notgouped: [] };
  defaultRouter.forEach((item) => {
    if (!item.title)
      return;
    const { title, path, icon, group } = item;
    const newItem = { title, path, icon };
    if (!group) {
      return groups['notgouped'].push(newItem);
    }
    if (groups[group])
      groups[group].push(newItem);
    else {
      groups[group] = [newItem];
    }
  });
  return groups;
};

const staticRouter = getRouter();

const mapState = () => ({
  router: staticRouter,
});

export default withLastLocation(withRouter(connect(mapState)(Router)));
