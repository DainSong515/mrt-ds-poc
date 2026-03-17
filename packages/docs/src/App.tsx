import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';

const OverviewPage = lazy(() => import('./pages/OverviewPage'));
const ButtonPage = lazy(() => import('./pages/components/ButtonPage'));
const TextPage = lazy(() => import('./pages/components/TextPage'));
const IconPage = lazy(() => import('./pages/components/IconPage'));
const ChipPage = lazy(() => import('./pages/components/ChipPage'));
const TabBarPage = lazy(() => import('./pages/components/TabBarPage'));
const ColorPage = lazy(() => import('./pages/tokens/ColorPage'));
const TypographyPage = lazy(() => import('./pages/tokens/TypographyPage'));
const ShadowPage = lazy(() => import('./pages/tokens/ShadowPage'));
const ProgressBoardPage = lazy(() => import('./pages/ProgressBoardPage'));
const DesignCheckPage = lazy(() => import('./pages/DesignCheckPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
      로딩 중...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<OverviewPage />} />
            <Route path="components/button" element={<ButtonPage />} />
            <Route path="components/text" element={<TextPage />} />
            <Route path="components/icon" element={<IconPage />} />
            <Route path="components/chip" element={<ChipPage />} />
            <Route path="components/tabbar" element={<TabBarPage />} />
            <Route path="tokens/color" element={<ColorPage />} />
            <Route path="tokens/typography" element={<TypographyPage />} />
            <Route path="tokens/shadow" element={<ShadowPage />} />
            <Route path="progress" element={<ProgressBoardPage />} />
            <Route path="design-check" element={<DesignCheckPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
