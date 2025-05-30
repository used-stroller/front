// app/privacy-policy/page.tsx
import React from "react";
import styles from "@/styles/privacy.module.css";

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>개인정보 처리방침</h1>

      <p className={styles.paragraph}>
        <strong>중모차(jungmocha.co.kr)</strong>는 「개인정보 보호법」에 따라
        이용자의 개인정보를 보호하고, 관련된 고충을 신속하고 원활하게 처리할 수
        있도록 본 개인정보 처리방침을 수립·공개합니다. 본 방침은{" "}
        <strong>2025년 5월 30일</strong>부터 적용됩니다.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. 수집 항목 및 수집 방법</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            회원가입 시: 이름, 휴대전화번호, 이메일
          </li>
          <li className={styles.listItem}>
            상품 등록 및 문의 시: 사진, 제품 정보, 위치 정보
          </li>
          <li className={styles.listItem}>
            서비스 이용 시: 접속 IP, 브라우저 정보, 쿠키
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. 개인정보의 이용 목적</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>회원 식별 및 관리</li>
          <li className={styles.listItem}>
            중고 유모차 등록 및 추천 서비스 제공
          </li>
          <li className={styles.listItem}>고객 응대 및 공지사항 전달</li>
          <li className={styles.listItem}>서비스 품질 개선 및 통계 분석</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. 보유 및 이용 기간</h2>
        <p className={styles.paragraph}>
          수집한 개인정보는 원칙적으로 수집·이용 목적이 달성될 때까지 보관하며,
          관련 법령에 따라 다음과 같이 일정 기간 보관됩니다.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            계약 또는 청약철회 등에 관한 기록: 5년
          </li>
          <li className={styles.listItem}>
            소비자 불만 또는 분쟁 처리에 관한 기록: 3년
          </li>
          <li className={styles.listItem}>접속 로그(IP 등): 3개월</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          4. 개인정보의 제3자 제공 및 처리 위탁
        </h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            법령에 근거하거나 이용자의 동의가 있는 경우에 한해 제공
          </li>
          <li className={styles.listItem}>
            Amazon Web Services: 데이터 저장 및 운영
          </li>
          <li className={styles.listItem}>카카오(주): 소셜 로그인 인증 처리</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. 이용자의 권리</h2>
        <p className={styles.paragraph}>
          이용자는 개인정보와 관련하여 다음과 같은 권리를 언제든지 행사할 수
          있습니다.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>개인정보 열람, 수정, 삭제 요청</li>
          <li className={styles.listItem}>동의 철회 및 회원 탈퇴</li>
          <li className={styles.listItem}>개인정보 처리 정지 요청</li>
        </ul>
        <p className={styles.paragraph}>
          ※ 문의:{" "}
          <a href="mailto:mattang123@naver.com" className={styles.link}>
            mattang123@naver.com
          </a>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. 개인정보 보호 책임자</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>성명: 이동훈</li>
          <li className={styles.listItem}>직책: 개인정보 보호책임자</li>
          <li className={styles.listItem}>이메일: mattang123@naver.com</li>
          <li className={styles.listItem}>연락처: 010-8113-6030</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. 쿠키 사용 안내</h2>
        <p className={styles.paragraph}>
          중모차는 서비스 개선 및 사용자 경험 향상을 위해 쿠키를 사용합니다.
          브라우저 설정을 통해 쿠키 저장을 거부할 수 있으며, 이 경우 일부 서비스
          이용에 제한이 있을 수 있습니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>8. 고지의 의무</h2>
        <p className={styles.paragraph}>
          본 개인정보 처리방침은 법령이나 서비스 정책 변경에 따라 변경될 수
          있으며, 변경 시 최소 7일 전에 웹사이트를 통해 사전 고지합니다.
        </p>
      </section>
    </main>
  );
}
