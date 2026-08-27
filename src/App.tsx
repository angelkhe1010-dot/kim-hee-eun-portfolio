import {
  Route,
  Routes,
} from 'react-router-dom';

import Hero from './components/sections/Hero';
import Works from './components/sections/Works';
import Approach from './components/sections/Approach';
import Process from './components/sections/Process';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Header from './components/sections/Header';
import TopButton from './components/sections/TopButton';
import ScaleWrapper from './components/sections/ScaleWrapper';

import SolPayDetail from './pages/SolPayDetail';

function Home() {
  return (
    <div className="page">
      {/* 화면에 고정되어야 하는 요소는 ScaleWrapper 바깥 */}
      <Header />
      <TopButton />

      {/* 1920px 디자인 전체를 동일한 비율로 축소 */}
      <ScaleWrapper>
        <Hero />
        <Works />
        <Approach />
        <Process />
        <About />
        <Experience />
        <Contact />
      </ScaleWrapper>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/works/solpay"
        element={<SolPayDetail />}
      />
    </Routes>
  );
}

export default App;