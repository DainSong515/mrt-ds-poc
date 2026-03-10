/**
 * Button 스토리
 * 모든 variant × size 조합 문서화
 */
import React from 'react';
import { Button } from './Button';
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_VARIANT_TOKENS, BUTTON_SIZE_SPECS } from './Button.types';

export default {
  title: 'Components/Button',
  component: Button,
};

/** 모든 variant 기본 예시 */
export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
    {BUTTON_VARIANTS.map((variant) => (
      <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '120px', fontSize: '12px', color: '#495056' }}>{variant}</span>
        <Button variant={variant} size="medium">
          {BUTTON_VARIANT_TOKENS[variant].description.split('.')[0]}
        </Button>
      </div>
    ))}
  </div>
);

/** 모든 size 예시 (primary 기준) */
export const AllSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
    {BUTTON_SIZES.map((size) => (
      <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#495056' }}>{size}</span>
        <Button variant="primary" size={size}>
          {BUTTON_SIZE_SPECS[size].height} 버튼
        </Button>
      </div>
    ))}
  </div>
);

/** variant × size 전체 매트릭스 */
export const VariantSizeMatrix = () => (
  <div style={{ padding: '20px', overflowX: 'auto' }}>
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '8px', textAlign: 'left', fontSize: '12px' }}>variant \ size</th>
          {BUTTON_SIZES.map((size) => (
            <th key={size} style={{ padding: '8px', fontSize: '12px' }}>{size}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {BUTTON_VARIANTS.map((variant) => (
          <tr key={variant}>
            <td style={{ padding: '8px', fontSize: '12px', color: '#495056' }}>{variant}</td>
            {BUTTON_SIZES.map((size) => (
              <td key={size} style={{ padding: '8px' }}>
                <Button variant={variant} size={size}>버튼</Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** 상태별 예시 */
export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
    <Button variant="primary">기본</Button>
    <Button variant="primary" loading>로딩 중</Button>
    <Button variant="primary" disabled>비활성화</Button>
    <Button variant="primary" fullWidth>전체 너비</Button>
    <Button variant="tertiary" leftIcon="IcoArrowLeft">아이콘 + 텍스트</Button>
    <Button variant="secondary" rightIcon="IcoArrowRight">텍스트 + 아이콘</Button>
  </div>
);

/** 메인 CTA 사용 예시 */
export const CTAExample = () => (
  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '320px' }}>
    <Button variant="primary" size="large" fullWidth>
      결제하기
    </Button>
    <Button variant="secondary" size="large" fullWidth>
      장바구니 담기
    </Button>
    <Button variant="text" size="medium">
      나중에 하기
    </Button>
  </div>
);
