import React, { useState } from 'react';
import { PropsTable } from './PropsTable';
import { CodeBlock } from './CodeBlock';
import type { iOSMeta } from '../data/components';

export function IOSSection({ ios }: { ios: iOSMeta }) {
  const exampleKeys = Object.keys(ios.usageExamples);
  const [exampleTab, setExampleTab] = useState(exampleKeys[0]);

  return (
    <div className="space-y-10">
      {/* iOS 기본 정보 */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm space-y-1">
        <p><span className="font-semibold text-purple-800">Framework:</span> <span className="text-purple-700">{ios.framework}</span></p>
        <p><span className="font-semibold text-purple-800">Module:</span> <code className="text-purple-700">{ios.modulePath}</code></p>
        <pre className="mt-2 text-xs bg-purple-100 text-purple-800 px-3 py-2 rounded font-mono whitespace-pre-wrap">{ios.importPath}</pre>
      </div>

      {/* Props 테이블 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Props (iOS)</h2>
        <PropsTable props={ios.props} />
      </section>

      {/* 코드 예시 */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Swift 코드 예시</h2>
        <div className="flex gap-1 border-b border-gray-200 mb-3">
          {exampleKeys.map((key) => (
            <button
              key={key}
              onClick={() => setExampleTab(key)}
              className={`px-4 py-1.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                exampleTab === key
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <CodeBlock code={ios.usageExamples[exampleTab]} />
      </section>
    </div>
  );
}
