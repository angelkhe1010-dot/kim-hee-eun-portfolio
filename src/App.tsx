import { useLayoutEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Hero from './components/sections/Hero';
import Works from './components/sections/Works';
import Approach from './components/sections/Approach';
import Process from './components/sections/Process';
import Skills from './components/sections/Skills';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Header from './components/sections/Header';
import TopButton from './components/sections/TopButton';
import EmailToast from './components/sections/EmailToast';
import ScaleWrapper from './components/sections/ScaleWrapper';

import SolPayDetail from './pages/SolPayDetail';
import CardApplyDetail from './pages/CardApplyDetail';

/*
 * The browser's own history.scrollRestoration defaults to 'auto', which
 * lets it reassert a previous scroll position around SPA route changes
 * (this is the standard, documented cause of a route change briefly
 * showing the old scroll position before JS can correct it -- react-router
 * itself does nothing here since this app uses plain BrowserRouter/Routes,
 * not the data router's <ScrollRestoration>). Turning it off hands scroll
 * position entirely to the effect below, with no competing browser-native
 * restoration in the mix. Set once, at module scope, not tied to any one
 * route.
 */
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function Home() {
  return (
    <div className="page">
      {/* 화면에 고정되어야 하는 요소는 ScaleWrapper 바깥 */}
      <Header />
      <TopButton />
      <EmailToast />

      {/* 1920px 디자인 전체를 동일한 비율로 축소 */}
      <ScaleWrapper>
        <Hero />
        <Works />
        <Approach />
        <Process />
        <Skills />
        <About />
        <Experience />
        <Contact />
      </ScaleWrapper>
    </div>
  );
}

function App() {
  const { pathname, hash } = useLocation();

  /*
   * SPA route changes (e.g. main -> /works/solpay, or the detail page's
   * Back button routing to /#works) don't reset scroll position on
   * their own, so a route can open mid-scroll or land on the wrong
   * section. Resolve the correct target synchronously and jump to it
   * with no animation:
   *  - a route pushed with a hash (e.g. navigate('/#works') from the
   *    detail page's Back button) lands directly on that element
   *  - otherwise every route starts at the very top (e.g. the detail
   *    page's Hero)
   *
   * useLayoutEffect (not useEffect) so this runs synchronously right
   * after the new route's DOM is committed but before the browser
   * paints -- otherwise the old scroll position gets painted for one
   * frame first and the jump is visible as a flash/scroll motion.
   *
   * Belt-and-suspenders against global.css's `scroll-behavior: smooth`
   * on <html>: passing behavior:'auto' only overrides it for *this*
   * scroll call, not for any other agent (e.g. the browser's own
   * scroll-restoration pass, now disabled above, or a stray scroll
   * triggered elsewhere during this same transition) that might nudge
   * the scroll position around the same moment and animate doing so.
   * Toggling the CSS property off for the duration of this call removes
   * that possibility entirely; it's restored right after so the main
   * page's own #works/#about/#experience anchor links (plain <a> tags,
   * untouched by this effect since they never change pathname/hash
   * through the router) keep animating exactly as before.
   */
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = 'auto';

    const target = hash ? document.getElementById(hash.slice(1)) : null;

    const jumpToTop = () => {
      /*
       * window.scrollTo 하나만 믿지 않는다 -- 드물게 같은 틱에
       * 다른 코드(리사이즈 핸들러, 레이아웃 재계산 등)가 스크롤을
       * 다시 건드리는 경우를 대비해 documentElement/body의
       * scrollTop을 직접 0으로도 맞추고, 다음 프레임에 한 번 더
       * 확인해 확실히 맨 위에서 시작하게 한다.
       */
      window.scrollTo(0, 0);
      root.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    if (target) {
      target.scrollIntoView({
        block: 'start',
        behavior: 'auto',
      });
    } else {
      jumpToTop();
      requestAnimationFrame(jumpToTop);
    }

    root.style.scrollBehavior = previousScrollBehavior;
  }, [pathname, hash]);

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

      <Route
        path="/works/cardapply"
        element={<CardApplyDetail />}
      />
    </Routes>
  );
}

export default App;