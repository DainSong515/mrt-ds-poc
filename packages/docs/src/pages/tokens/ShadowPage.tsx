import React from 'react';
import { ShadowCard } from '../../components/ShadowCard';
import { parseShadows } from '../../data/tokens';

export default function ShadowPage() {
  const shadows = parseShadows();
  const standard = shadows.filter((s) => !s.isVertical);
  const vertical = shadows.filter((s) => s.isVertical);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Shadow</h1>
        <p className="mt-2 text-gray-500">
          그림자 토큰. E100~E500 표준(아래 방향)과 E100V~E500V 역방향(위 방향, 바텀시트 등) 두 계열.
        </p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">표준 (E100–E500)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {standard.map((s) => (
            <ShadowCard key={s.name} name={s.name} value={s.value} description={s.description} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">역방향 (E100V–E500V)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vertical.map((s) => (
            <ShadowCard key={s.name} name={s.name} value={s.value} description={s.description} />
          ))}
        </div>
      </div>
    </div>
  );
}
