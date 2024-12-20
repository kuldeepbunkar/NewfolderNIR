import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Services from './pages/Services';
import About from './pages/About';
import Login from './pages/Login';
import LeadsService from './pages/services/LeadsService';
import ConstructionService from './pages/services/ConstructionService';
import FinanceService from './pages/services/FinanceService';
import BrandService from './pages/services/BrandService';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import PropertyDetails from './pages/PropertyDetails';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import ProtectedRoute from './components/common/ProtectedRoute';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NotificationProvider>
          <AuthProvider>
            <PropertyProvider>
              <SearchProvider>
                <Router>
                  <div className="App">
                    <Header />
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/properties" component={Properties} />
                      <Route path="/properties/:id" component={PropertyDetails} />
                      <Route exact path="/services" component={Services} />
                      <ProtectedRoute path="/services/leads" component={LeadsService} />
                      <ProtectedRoute path="/services/construction" component={ConstructionService} />
                      <ProtectedRoute path="/services/finance" component={FinanceService} />
                      <ProtectedRoute path="/services/brand" component={BrandService} />
                      <Route path="/about" component={About} />
                      <Route path="/contact" component={Contact} />
                      <Route path="/login" component={Login} />
                      <Route component={NotFound} />
                    </Switch>
                    <Footer />
                  </div>
                </Router>
              </SearchProvider>
            </PropertyProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 