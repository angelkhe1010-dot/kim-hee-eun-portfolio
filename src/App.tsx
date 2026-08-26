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
function App() {
  return (
    <div className="page">
      <Header />
      <TopButton />
      <Hero />
      <Works />
      <ScaleWrapper>
      <Approach />
      <Process />
      <About />
      <Experience />
      <Contact />
      </ScaleWrapper>
    </div>
  );
}

export default App;
