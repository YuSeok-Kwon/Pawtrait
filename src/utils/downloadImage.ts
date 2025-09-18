// 간단한 이미지 다운로드 유틸 함수
// a 태그를 만들어 클릭 후 제거하는 방식
export function downloadImage(url: string, filename: string) {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    console.error('이미지 다운로드 실패:', e);
  }
}
