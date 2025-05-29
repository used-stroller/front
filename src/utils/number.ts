// utils/number.ts

/**
 * 숫자를 3자리마다 콤마로 포맷합니다.
 * 예: "1234567" → "1,234,567"
 */
export function formatNumberWithComma(value: string): string {
  const number = value.replace(/[^\d]/g, ""); // 숫자만 추출
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 콤마 포함된 문자열을 숫자로 변환합니다.
 * 예: "1,234,567" → 1234567
 */
export function parseNumber(value: string): number {
  return Number(value.replace(/,/g, ""));
}
