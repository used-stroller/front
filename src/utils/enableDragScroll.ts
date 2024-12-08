// dragScroll.ts
export function enableDragScroll(container: HTMLElement): void {
  let isDown: boolean = false;
  let startY: number;
  let scrollTop: number;

  container.addEventListener("mousedown", (e: MouseEvent) => {
    isDown = true;
    container.classList.add("active");
    startY = e.pageY - container.offsetTop;
    scrollTop = container.scrollTop;
  });

  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("active");
  });

  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("active");
  });

  container.addEventListener("mousemove", (e: MouseEvent) => {
    if (!isDown) return;

    e.preventDefault();
    const y = e.pageY - container.offsetTop;
    const walk = (y - startY) * 1; // 스크롤 속도 조정
    container.scrollTop = scrollTop - walk; // 즉시 스크롤 업데이트
  });

  // 이미지 드래그 방지
  container.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
}
