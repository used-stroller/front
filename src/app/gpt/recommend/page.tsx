"use client";
import { type ChangeEvent, useEffect, useState } from "react";
import styles from "@/styles/recommend.module.css";
import Image from "next/image";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useRouter } from "next/navigation"; //

export default function RecommendPage(): JSX.Element {
  // 상태 정의
  const [result, setResult] = useState(""); // GPT 추천 결과 텍스트
  const [loading, setLoading] = useState(false); // 추천 로딩 여부
  const [step, setStep] = useState(1); // 현재 진행 단계 (1~4)
  const [twin, setTwin] = useState("no"); // 쌍둥이 여부 (라디오 버튼용)
  const [model, setModel] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const router = useRouter();

  // 사용자 입력 폼 상태
  const [form, setForm] = useState({
    ageCode: "",
    twin: "no",
    maxPriceNew: 0,
    maxPriceUsed: 0,
    weightKeywordList: [] as number[], // 중요 요소 최대 3개
    userText: "", // 기타 요청사항
    sessionId: "",
  });

  interface ModelResponse {
    name?: string;
  }

  useEffect(() => {
    console.log("form 값이 변경되었습니다:", form);
  }, [form]);

  // 우선순위 토글 (최대 3개 선택)
  const togglePriority = (value: number): void => {
    setForm((prev) => {
      const exists = prev.weightKeywordList.includes(value);
      const newPriorities = exists
        ? prev.weightKeywordList.filter((p) => p !== value)
        : [...prev.weightKeywordList, value];
      return { ...prev, weightKeywordList: newPriorities.slice(0, 3) };
    });
  };

  // 최종 제출 처리
  const handleSubmit = async (): Promise<void> => {
    setStep(4);
    await handleRecommend();
  };

  // GPT 추천 요청 및 SSE 응답 처리
  const handleRecommend = async (): Promise<void> => {
    if (loading) return;

    setLoading(true);
    setResult("");

    try {
      const randomId = crypto.randomUUID();
      const updatedForm = { ...form, sessionId: randomId };
      setForm(updatedForm);

      const res = await fetch(apiUrl + "/api/gpt/recommend/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(updatedForm),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder(); // stream: true 제거
      let fullText = "";
      let partial = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        partial += decoder.decode(value, { stream: true });

        // 줄 단위로 쪼개기 (SSE 기본은 한 줄 단위로 data: ... 이 전송됨)
        const lines = partial.split("\n");

        // 마지막 줄은 다음 데이터 조각과 이어질 수 있으므로 따로 보관
        partial = lines.pop() ?? "";

        for (let line of lines) {
          if (!line.trim()) continue;

          line = line.replace(/^data:\s*/, "");
          line = line
            .replace(/\\n/g, "\n")
            .replace(/\s{2,}/g, " ")
            .replace(
              /(https?:\/\/[^\s)]+)\s*\n\s*([a-zA-Z0-9-]+\.[^\s)]+)/g,
              "$1$2",
            )
            .replace(
              /(https?:\/\/[^\s)]+)\.\s*([a-zA-Z0-9-]+\.[^\s)]+)/g,
              "$1.$2",
            )
            .replace(/!\[(.*?)\]\(\s*(https?:\/\/[^\s]+?)\s*\)/g, "![$1]($2)")
            .replace(/(\.(png|jpg|jpeg|webp))\d+/gi, ".$2");

          fullText += line + "\n";
          setResult(fullText); // ✅ 여기서 매번 전체 텍스트로 업데이트
        }
      }

      // 남은 partial도 마지막에 처리
      if (partial.trim()) {
        fullText += partial.replace(/^data:\s*/, "") + "\n";
        setResult(fullText);
      }
      await getModelInfo(randomId);
    } catch (error) {
      console.error(error);
      setResult("추천 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const getModelInfo = async (sessionId: string): Promise<void> => {
    try {
      const response = await fetch(
        `${apiUrl}/api/gpt/get/model?sessionId=${encodeURIComponent(sessionId)}`,
      );

      if (!response.ok) {
        throw new Error("모델 정보를 불러오지 못했습니다.");
      }

      const data: ModelResponse = await response.json();
      console.log("data", data);
      const modelName = data.name;
      setModel(modelName);
    } catch (error) {
      console.error("모델 정보 가져오기 실패:", error);
      setModel("모델명을 불러올 수 없습니다.");
    }
  };

  // 이전 단계로 가는 버튼
  const PrevButton = ({ onClick }: { onClick: () => void }): JSX.Element => (
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
    const value = event.target.value;
    setTwin(value);
    setForm((prev) => ({ ...prev, twin: value }));
  };

  // step 변경 시 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleViewProducts = (model: string): void => {
    const encoded = encodeURIComponent(model);
    router.push(`/?keyword=${encoded}`);
  };

  const handleRestart = (): void => {
    setForm({
      ageCode: "",
      twin: "no",
      maxPriceNew: 0,
      maxPriceUsed: 0,
      weightKeywordList: [],
      userText: "",
      sessionId: "",
    });
    setResult("");
    setModel("");
    setTwin("no");
    setStep(1);
  };

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
                onClick={() => {
                  setForm({ ...form, ageCode: val });
                }}
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
            <input
              type="number"
              value={form.maxPriceNew}
              onChange={(e) => {
                setForm({ ...form, maxPriceNew: Number(e.target.value) });
              }}
            />
            원
          </div>
          <div>
            <span>중고제품 기준 최대 예산</span>
            <input
              type="number"
              value={form.maxPriceUsed}
              onChange={(e) => {
                setForm({ ...form, maxPriceUsed: Number(e.target.value) });
              }}
            />
            원
          </div>
          <button
            className={styles.buttonPrimary}
            onClick={() => {
              setStep(2);
            }}
            disabled={
              form.ageCode === null ||
              form.maxPriceNew === 0 ||
              form.maxPriceUsed === 0
            }
          >
            다음
          </button>
        </div>
      )}

      {/* Step 2: 중요 기준 선택 */}
      {step === 2 && ( // 현재 스텝이 2일 때만 이 섹션을 렌더링
        <div>
          {/* 이전 단계로 돌아가는 버튼 */}
          <PrevButton
            onClick={() => {
              setStep(1);
            }}
          />

          {/* 현재 단계 헤더 */}
          <h2 className={styles.stepHeader}>
            Step 2 of 4: 중요 기준 선택 (3개)
          </h2>

          {/* 선택 가능한 기준 리스트를 그리드 형태로 표시 */}
          <div className={styles.grid}>
            {priorityOptions.map(({ label, desc, value }) => (
              <button
                key={value} // 리액트 리스트 렌더링을 위한 고유 key
                onClick={() => {
                  togglePriority(value);
                }} // 클릭 시 선택 토글
                className={`${styles.card} ${
                  form.weightKeywordList.includes(value) ? styles.selected : ""
                }`} // 선택된 항목에 selected 스타일 적용
              >
                {/* 선택된 항목에는 체크 아이콘 표시 */}
                {form.weightKeywordList.includes(value) && (
                  <FaCheckCircle className={styles.checkIcon} />
                )}

                {/* 항목 이름 */}
                <strong>{label}</strong>

                {/* 항목 설명 (desc가 빈 문자열일 경우에도 렌더링됨) */}
                <p>{desc}</p>
              </button>
            ))}
          </div>

          {/* 다음 단계로 진행하는 버튼 (3개 선택되어야만 활성화됨) */}
          <button
            className={styles.buttonPrimary}
            onClick={() => {
              setStep(3);
            }}
            disabled={form.weightKeywordList.length !== 3} // 선택이 정확히 3개일 때만 활성화
          >
            다음
          </button>
        </div>
      )}

      {/* Step 3:기타 요청 입력 */}
      {step === 3 && (
        <div>
          <PrevButton
            onClick={() => {
              setStep(2);
            }}
          />
          <h2 className={styles.stepHeader}>Step 3 of 4:고객 특별 요청</h2>
          <div className={styles.tipBox}>
            <div className={styles.tipTitle}>
              💡 이런 걸 알려주시면 추천이 더 정확해요
            </div>
            <ul className={styles.tipList}>
              <li>1. 디자인이 예뻤으면 좋겠어요</li>
              <li>
                2. 차 트렁크에 자주 넣고 꺼내야 해서 작고 가벼웠으면 좋겠어요
              </li>
            </ul>
          </div>
          <textarea
            placeholder="예: 혼자서 접기 쉬웠으면 좋겠어요"
            className={styles.textarea}
            value={form.userText}
            onChange={(e) => {
              setForm({ ...form, userText: e.target.value });
            }}
          />
          <button
            className={styles.buttonPrimary}
            // eslint-disable-next-line no-void
            onClick={() => void handleSubmit()}
          >
            추천받기
          </button>
        </div>
      )}

      {/* Step 4: 추천 결과 */}
      {step === 4 && ( // Step 4: 추천 결과 화면 렌더링 조건
        <div>
          {/* 추천 결과 단계 헤더 */}
          <h2 className={styles.stepHeader}>Step 4 of 4: 추천 결과</h2>

          {/* 추천 다시 받기 버튼 (로딩 중이면 비활성화) */}
          <button
            onClick={handleRestart}
            disabled={loading}
            className={styles.buttonPrimary}
          >
            {loading ? "추천 중..." : "AI 추천 다시 받기"}
          </button>

          {/* 결과가 있고 로딩 중이 아닐 때만 '매물 보러가기' 버튼 표시 */}
          {!loading && result && (
            <button
              onClick={() => {
                handleViewProducts(model);
              }} // model 값을 명시적으로 넘김
              className={styles.buttonSecondary}
            >
              {model} 매물 보러가기
            </button>
          )}

          {/* GPT 추천 결과를 표시하는 영역 */}
          <div className={styles.resultBox}>
            {loading ? (
              // 로딩 중이면 실시간 텍스트 출력용 <pre> 표시
              <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
            ) : result ? (
              // 결과가 있을 경우 Markdown 형태로 렌더링
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
                  // eslint-disable-next-line jsx-a11y/heading-has-content
                  h2: ({ node, ...props }) => <h2 {...props} />,
                  br: () => <br />,
                }}
              >
                {result}
              </ReactMarkdown>
            ) : (
              // 결과가 아예 없을 경우 출력
              "아직 추천 결과가 없습니다."
            )}
          </div>
        </div>
      )}
    </div>
  );
}
