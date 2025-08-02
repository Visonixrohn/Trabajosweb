import { LanguageProvider } from './contexts/LanguageContext';
import { RouterProvider } from './contexts/RouterContext';
import MainApp from './components/MainApp';
import './animations.css';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <MainApp />
      </RouterProvider>
    </LanguageProvider>
  );
}

export default App;
