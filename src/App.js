import React, { useState } from 'react';
import './App.css';
import { Menu, Icon, Layout  } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import NewMeetup from './pages/new-meetup'
import Meetups from './pages/meetups'
import MeetupsDetails from './pages/meetup-details'
import NewEvent from './pages/new-event'

const { Header, Content, Footer } = Layout;

function App() {
  const [current, setCurrent] = useState(0);

  return (
    <Layout>
      <Router>
        <Header>
          <Menu
            theme="dark"
            style={{ lineHeight: '64px' }}
            onClick={(e) => setCurrent(e.key)}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="unordered-list">
              <Link to="/">
                <Icon type="unordered-list" />
                Meetups
              </Link>
            </Menu.Item>
            <Menu.Item key="usergroup-add">
              <Link to="/new">
                <Icon type="usergroup-add" />
                Create a new meetup group
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 400 }}>
            <Switch>
              <Route path="/new">
                <NewMeetup />
              </Route>
              <Route path="/meetup/:id/new">
                <NewEvent />
              </Route>
              <Route path="/meetup/:id">
                <MeetupsDetails />
              </Route>
              <Route path="/">
                <Meetups />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>...</Footer>
      </Router>
    </Layout>
  );
}

export default App;
