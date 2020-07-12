import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Example00 from "./examples/example_00";
import Example001 from "./examples/example_001";

import Example01 from "./examples/example_01";
import Example011 from "./examples/example_011";
import Example012 from "./examples/example_012";
import Example013 from "./examples/example_013";

import Example02 from "./examples/example_02";
import Example03 from "./examples/example_03";
import Example04 from "./examples/example_04";
import Example05 from "./examples/example_05";

// import ComparisionPerPeriod from "./examples/comparision";

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>Example 0</div>,
    main: () => <Example00/>,
  },
  {
    path: '/custom_color',
    exact: true,
    sidebar: () => <div>Example 0.1</div>,
    main: () => <Example001/>,
  },
  {
    path: '/lines',
    exact: true,
    sidebar: () => <div>Example 1</div>,
    main: () => <Example01/>,
  },
  {
    path: '/area',
    exact: true,
    sidebar: () => <div>Example 1.1</div>,
    main: () => <Example011/>,
  },
  {
    path: '/area_opacity',
    exact: true,
    sidebar: () => <div>Example 1.2</div>,
    main: () => <Example012/>,
  },
  {
    path: '/max_lines',
    exact: true,
    sidebar: () => <div>Example 1.3</div>,
    main: () => <Example013/>,
  },
  {
    path: '/basic',
    sidebar: () => <div>Example 2</div>,
    main: () => <Example02/>,
  },
  {
    path: '/colors',
    sidebar: () => <div>Example 3</div>,
    main: () => <Example03/>,
  },
  {
    path: '/config',
    sidebar: () => <div>Example 4</div>,
    main: () => <Example04/>,
  },
  {
    path: '/test',
    sidebar: () => <div>Example 5</div>,
    main: () => <Example05/>,
  },
  // {
  //   path: '/comparision',
  //   sidebar: () => <div>Period&nbsp;Comparision</div>,
  //   main: () => <ComparisionPerPeriod/>,
  // },
]

class App extends React.Component {
  render() {
    return (
      <Router>
        <div style={{display: 'flex'}}>
          <div style={{
            padding: '10px',
            width: '40%',
            background: '#f0f0f0',
            maxWidth: 200,
            minHeight: '100vh'
          }}>
            <ul style={{listStyleType: 'none', padding: 0}}>
              <li><Link to='/'>Example 0</Link></li>
              <li><Link to='/custom_color'>Example 0.1</Link></li>
              <li><Link to='/lines'>Example 1</Link></li>
              <li><Link to='/area'>Example 1.1</Link></li>
              <li><Link to='/area_opacity'>Example 1.2</Link></li>
              <li><Link to='/max_lines'>Example 1.3</Link></li>
              <li><Link to='/basic'>Example 2</Link></li>
              <li><Link to='/colors'>Example 3</Link></li>
              <li><Link to='/config'>Example 4</Link></li>
              <li><Link to='/test'>Example 5</Link></li>
              {/* <li><Link to='/comparision'>Period&nbsp;Comparision</Link></li> */}
            </ul>

            {routes.map((route) => (
              <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
              />
            ))}
          </div>
          <div style={{width: '90vw', padding: '10px'}}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
