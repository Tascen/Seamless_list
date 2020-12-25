import '@styles/gen.scss'

import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom'
import styled, { css } from 'styled-components';

import { Provider } from 'react-redux'
import store from './redux/store'

import { HashRouter, Switch, Route, Link, BrowserHistory, Redirect } from "react-router-dom";
import { getHistory, ReactRouterGlobalHistory } from 'react-router-global-history';
import * as path from "./routers_path";

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {Loader, Fallback_loader} from './сomponents/page_elements/loader.jsx';

import {Preload_lazy_components} from './preload_lazy_components.jsx';
const Page_library = React.lazy(() => import('./сomponents/pages/page_library.jsx'));
const Page_library_item = React.lazy(() => import('./сomponents/pages/page_library_item.jsx'));

const pages = [
  {
    component: Page_library,
    path: path.URl_PAGE_LIBRARY,
  },
  {
    component: Page_library_item,
    path: path.URl_PAGE_LIBRARY_ITEM,
  },
]
const routes = [
  ...pages.map(page=>
    <Route exact key={page.path} path={page.path} component={page.component} />
  ),
  <Route exact key="nothing" path="/" render={()=><Redirect to={pages[0].path} />}/>
];

const PageTransitionGroup = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1200px;
  overflow: hidden;
`;
const PageTransitionWrapper = styled.div`
  backface-visibility: hidden;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 0);
  width: 100%;
  will-change: tranform;
`;



render(
  <App/>,
  document.getElementById('mobile_screen')
);






function App(props) {
  return (
    <Provider store={store}>
      <HashRouter>
        <ReactRouterGlobalHistory />
        <Suspense fallback={<Fallback_loader/>}>
          <Preload_lazy_components routes={pages}/>
          <Loader />
          <Route render={({ location }) =>
          <PageTransitionGroup>
            <TransitionGroup component={null}>
              <CSSTransition
                key={location.pathname}
                timeout={1400}
                classNames="page_anim-fade"
              >
                <PageTransitionWrapper>
                  <Switch location={location}>
                    {routes}
                  </Switch>
                </PageTransitionWrapper>
              </CSSTransition>
            </TransitionGroup>
          </PageTransitionGroup>
          }/>

        </Suspense>
      </HashRouter>
    </Provider>
  )
}
