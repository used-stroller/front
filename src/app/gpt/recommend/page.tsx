"use client";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "@/styles/recommend.module.css";
import Image from "next/image";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import apiClient from '@/utils/apiClient';

export default function RecommendPage() {
  // 상태 정의
  const [result, setResult] = useState(""); // GPT 추천 결과 텍스트
  const [loading, setLoading] = useState(false); // 추천 로딩 여부
  const [step, setStep] = useState(1); // 현재 진행 단계 (1~4)
  const [twin, setTwin] = useState("no"); // 쌍둥이 여부 (라디오 버튼용)
  const [selected, setSelected] = useState<number[]>([]);


  // 사용자 입력 폼 상태
  const [form, setForm] = useState({
    ageCode: "",
    twin: false,
    maxPriceNew: 0,
    maxPriceUsed: 0,
    weightKeywordList: [] as number[], // 중요 요소 최대 3개
    userText: "", // 기타 요청사항
    sessionId: "",
  });

  useEffect(() => {
    console.log("form 값이 변경되었습니다:", form);
  }, [form]);

  // 우선순위 토글 (최대 3개 선택)
  const togglePriority = (value: number) => {
    setForm((prev) => {
      const exists = prev.weightKeywordList.includes(value);
      const newPriorities = exists
        ? prev.weightKeywordList.filter((p) => p !== value)
        : [...prev.weightKeywordList, value];
      return { ...prev, weightKeywordList: newPriorities.slice(0, 3) };
    });
  };

  // 최종 제출 처리
  const handleSubmit = () => {
    setForm((prev) => ({ ...prev, twin }));
    setStep(4);
    handleRecommend();
  };

  // GPT 추천 요청 및 SSE 응답 처리
  const handleRecommend = async () => {
    if (loading) return;

    setLoading(true);
    setResult("");

    // try {
    //   const res = await apiClient.post("http://localhost:8080/api/gpt/recommend/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "text/event-stream",
    //     },
    //     body: JSON.stringify({
    //       ageCode: "m",
    //     }),
    //   });

    try {
      const randomId = crypto.randomUUID();
      setForm({ ...form, sessionId: randomId })

      const res = await apiClient.post("http://localhost:8080/api/gpt/recommend/test", form, {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder(); // 🔥 stream: true 제거

      let fullText = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader!.read();
        if (done) break;

        // 🔥 stream: true 제거 — 조각 깨짐 방지
        buffer += decoder.decode(value);

        // 🔥 buffer 전체에서 data: 제거
        buffer = buffer.replace(/(^|\n) *data:\s?/g, "$1");

        buffer = buffer
          .replace(/\\n/g, "\n") // \n 복원
          .replace(/\s{2,}/g, " ") // 공백 정리
          .replace(
            /(https?:\/\/[^\s)]+)[\n\r]+\s*([a-zA-Z0-9-]+\.[^\s)]+)/g,
            "$1$2"
          ) // 🔥 줄바꿈 포함한 링크 복원
          .replace(
            /(https?:\/\/[^\s)]+)\.\s*([a-zA-Z0-9-]+\.[^\s)]+)/g,
            "$1.$2"
          ) // 🔧 마침표 + 공백 포함한 링크 복원
          .replace(/!\[(.*?)\]\(\s*(https?:\/\/[^\s]+?)\s*\)/g, "![$1]($2)")
          .replace(/(\.(png|jpg|jpeg|webp))\d+/gi, ".$2")
          .replace(/([^\n])\n([^\n])/g, "$1<br />$2")
          .replace(/([가-힣a-zA-Z0-9)\]])\. ?(?=[^\n])/g, "$1.\n\n");



        // 🔥 결과 누적 및 UI 업데이트
        fullText += buffer;
        setResult(fullText);

        buffer = ""; // 버퍼 초기화 (SSE는 매번 완성된 줄이 오기 때문)
      }
    } catch (error) {
      console.error(error);
      setResult("추천 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 이전 단계로 가는 버튼
  const PrevButton = ({ onClick }: { onClick: () => void }) => (
    <button className={styles.buttonSecondary} onClick={onClick}>
      <FaArrowLeft style={{ fontSize: 20, marginRight: 6 }} />
    </button>
  );

  // 연령대 옵션 정의
  const ageOptions = [
    { label: "신생아", image: "/images/baby1.png", age: "0-6개월", val: "s" },
    { label: "영아", image: "/images/baby2.png", age: "7-12 M", val: "m" },
    { label: "유아", image: "/images/baby3.png", age: "12개월~", val: "l" },
  ];

  const priorityOptions = [
    { label: "안정성", desc: "프레임이 견고하고, 흔들리지 않음", value: 1 },
    { label: "주행감", desc: "부드럽고 잘 굴러가는 느낌", value: 2 },
    { label: "브랜드 인지도", desc: "신뢰할 수 있는 인기 브랜드", value: 3 },
    { label: "가성비", desc: "상태 대비 합리적인 가격", value: 4 },
    { label: "가벼운 무게", desc: "가볍고 휴대하기 좋은 무게", value: 5 },
    { label: "기내반입", desc: "국내,해외 여행에 적합", value: 6 },
  ];

  // 쌍둥이 여부 변경 핸들러
  const handleTwinChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTwin(event.target.value);
  };

  // step 변경 시 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // 컴포넌트 렌더링
  return (
    <div className={styles.container}>
      {/* Step 1: 연령대 선택 및 쌍둥이 여부 */}
      {step === 1 && (
        <div>
          <h2 className={styles.stepHeader}>Step 1 of 4: 기본 정보 입력</h2>
          <div className={styles.ageGroup}>
            {ageOptions.map(({ label, image, age, val }) => (
              <button
                key={val}
                onClick={() => setForm({ ...form, ageCode: val })}
                className={`${styles.button} ${form.ageCode === val ? styles.buttonSelected : ""}`}
              >
                <Image src={image} alt={label} width={50} height={50} />
                <div>{label}</div>
                <div>{age}</div>
              </button>
            ))}
          </div>
          <div className={styles.buy_status}>
            <span className={styles.buy_status_p}>쌍둥이 용인가요?</span>
            <label>
              <input
                className={styles.input_radio}
                type="radio"
                name="twin"
                value="no"
                checked={twin === "no"}
                onChange={handleTwinChange}
              />
              아니오
            </label>
            <label>
              <input
                className={styles.input_radio}
                type="radio"
                name="twin"
                value="yes"
                checked={twin === "yes"}
                onChange={handleTwinChange}
              />
              예
            </label>
          </div>
          <div>
            <span>신제품 기준 최대 예산</span>
            <input type="number" 
                   value={form.maxPriceNew}
                   onChange={(e) =>
                    setForm({...form, maxPriceNew: Number(e.target.value)})
                   }
            />원
          </div>
          <div>
            <span>중고제품 기준 최대 예산</span>
            <input type="number" 
                  value={form.maxPriceUsed}
                   onChange={(e) =>
                    setForm({...form, maxPriceUsed: Number(e.target.value)})
                   }
            />원
          </div>
          <button
            className={styles.buttonPrimary}
            onClick={() => setStep(2)}
            disabled={form.ageCode == null || form.maxPriceNew == 0 || form.maxPriceUsed == 0}
          >
            다음
          </button>
        </div>
      )}

      {/* Step 2: 중요 기준 선택 */}
      {step === 2 && (
      <div>
          <PrevButton onClick={() => setStep(1)} />
          <h2 className={styles.stepHeader}>
            Step 2 of 4: 중요 기준 선택 (3개)
          </h2>

          <div className={styles.grid}>
            {priorityOptions.map(({ label, desc, value }) => (
              <button
                key={value}
                onClick={() => togglePriority(value)}
                className={`${styles.card} ${
                  form.weightKeywordList.includes(value) ? styles.selected : ""
                }`}
              >
                 {form.weightKeywordList.includes(value) && (
                  <FaCheckCircle className={styles.checkIcon} />
                  )}
                <strong>{label}</strong>
                <p>{desc}</p>
              </button>
            ))}
          </div>

          <button
            className={styles.buttonPrimary}
            onClick={() => setStep(3)}
            disabled={form.weightKeywordList.length !== 3}
          >
            다음
          </button>
        </div>
      )}

      {/* Step 3: 예산 및 기타 요청 입력 */}
      {step === 3 && (
        <div>
          <PrevButton onClick={() => setStep(2)} />
          <h2 className={styles.stepHeader}>Step 3 of 4: 예산과 기타 요청</h2>
          <input
            type="text"
            placeholder="예산 (예: 200000)"
            className={styles.input}
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />
          <textarea
            placeholder="기타 요청사항 (예: 디자인이 예뻤으면)"
            className={styles.textarea}
            value={form.request}
            onChange={(e) => setForm({ ...form, request: e.target.value })}
          />
          <button className={styles.buttonPrimary} onClick={handleSubmit}>
            추천받기
          </button>
        </div>
      )}

      {/* Step 4: 추천 결과 */}
      {step === 4 && (
        <div>
          <h2 className={styles.stepHeader}>Step 4 of 4: 추천 결과</h2>
          <button
            onClick={handleRecommend}
            disabled={loading}
            className={styles.buttonPrimary}
          >
            {loading ? "추천 중..." : "AI 추천 다시 받기"}
          </button>
          <div className={styles.resultBox}>
            {loading ? (
              <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre> // 실시간 출력
            ) : result ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  img: ({ node, ...props }) => (
                    <img
                      {...props}
                      style={{
                        display: "block",
                        maxWidth: "100%",
                        margin: "24px auto",
                        borderRadius: "12px",
                      }}
                      alt={props.alt ?? "image"}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      style={{
                        lineHeight: "1.9",
                        marginBottom: "16px",
                        whiteSpace: "pre-line",
                        wordBreak: "keep-all",
                      }}
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => <h2 {...props} />,
                  br: () => <br />,
                }}
              >
                {result}
              </ReactMarkdown>
            ) : (
              "아직 추천 결과가 없습니다."
            )}
          </div>
        </div>
      )}
    </div>
  );
}
