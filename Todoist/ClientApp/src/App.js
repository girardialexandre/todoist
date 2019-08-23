import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import ActivityList from './components/ActivityList';

export default () => (
  <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/' component={ActivityList} />
  </Layout>
);
