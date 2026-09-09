/*
 * SOL Pay 상세 페이지 섹션들은 HeroSection과 동일하게 1920px 기준
 * Figma 프레임 좌표를 vw로 변환해 고정폭 스케일 없이 유동적으로
 * 커진다/작아진다. 1920px = 100vw이므로 1px = 100/1920 vw.
 */
export function vw(px: number): string {
  return `${(px / 19.2).toFixed(4)}vw`;
}
