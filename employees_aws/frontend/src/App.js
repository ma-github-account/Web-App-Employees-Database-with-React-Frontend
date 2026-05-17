import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route, Switch, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import EmployeeListScreen from './screens/EmployeeListScreen'
import EmployeeDetailScreen from './screens/EmployeeDetailScreen'
import EmployeeCreateScreen from './screens/EmployeeCreateScreen'
import EmployeeEditScreen from './screens/EmployeeEditScreen'
import EmployeeDeleteScreen from './screens/EmployeeDeleteScreen'


function AppRoutes() {
  const location = useLocation()

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} classNames='page' timeout={220} unmountOnExit>
        <Switch location={location}>
          <Route path='/' component={EmployeeListScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />

          <Route path='/employees/create' component={EmployeeCreateScreen} />
          <Route path='/employees/:id/edit' component={EmployeeEditScreen} />
          <Route path='/employees/:id/delete' component={EmployeeDeleteScreen} />
          <Route path='/employees/:id' component={EmployeeDetailScreen} exact />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container style={{ position: 'relative' }}>
          <AppRoutes />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
