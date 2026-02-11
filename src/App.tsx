import { ThemeProvider, AppStateProvider } from './context';
import { Layout, TopBar, CardView, BottomBar } from './components';

const App = () => (
  <ThemeProvider>
    <AppStateProvider>
      <Layout>
        <TopBar />
        <CardView />
        <BottomBar />
      </Layout>
    </AppStateProvider>
  </ThemeProvider>
);

export default App;
