// app/privacy-policy/page.tsx
import React from "react";
import styles from "@/styles/privacy.module.css";

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>개인정보 처리방침</h1>

      <p>
        <strong>정모차(jungmocha.co.kr)</strong>은 「개인정보 보호법」에 따라
        이용자의 개인정보를 보호하고, 관련한 고충을 신속하고 원활하게 처리할 수
        있도록 다음과 같은 처리방침을 수립·공개합니다. 본 방침은{" "}
        <strong>2025년 5월 30일</strong>부터 적용됩니다.
      </p>

      <section>
        <h2>1. 수집 항목 및 수집 방법</h2>
        <ul>
          <li>회원가입 시: 이름, 휴대전화번호, 이메일</li>
          <li>상품 등록/문의 시: 사진, 제품 정보, 위치 정보</li>
          <li>서비스 이용 시: 접속 IP, 브라우저 정보, 쿠키</li>
        </ul>
      </section>

      <section>
        <h2>2. 개인정보 이용 목적</h2>
        <ul>
          <li>회원 식별 및 관리</li>
          <li>중고 유모차 등록/추천 서비스 제공</li>
          <li>고객 응대 및 공지사항 전달</li>
          <li>서비스 개선을 위한 통계 분석</li>
        </ul>
      </section>

      <section>
        <h2>3. 보유 및 이용 기간</h2>
        <p>
          원칙적으로 수집 및 이용 목적 달성 시까지 보관하며, 관련 법령에 따라
          아래 항목은 일정 기간 보관됩니다.
        </p>
        <ul>
          <li>계약 및 청약 철회 기록: 5년</li>
          <li>소비자 불만 또는 분쟁 처리 기록: 3년</li>
          <li>로그 기록(IP 등): 3개월</li>
        </ul>
      </section>

      <section>
        <h2>4. 제3자 제공 및 위탁</h2>
        <ul>
          <li>법령에 근거하거나 이용자의 동의가 있는 경우에 한하여 제공</li>
          <li>Amazon Web Services: 데이터 저장 및 운영</li>
          <li>카카오(주): 소셜 로그인 인증 처리</li>
        </ul>
      </section>

      <section>
        <h2>5. 정보주체의 권리</h2>
        <p>이용자는 언제든지 개인정보 관련 아래 권리를 행사할 수 있습니다.</p>
        <ul>
          <li>개인정보 열람, 수정, 삭제 요청</li>
          <li>동의 철회 및 회원 탈퇴</li>
          <li>처리 정지 요청</li>
        </ul>
        <p>
          ※ 고객센터:{" "}
          <a href="mailto:help@jungmocha.co.kr">help@jungmocha.co.kr</a>
        </p>
      </section>

      <section>
        <h2>6. 개인정보 보호 책임자</h2>
        <ul>
          <li>성명: 홍길동</li>
          <li>직책: 개인정보 보호책임자</li>
          <li>이메일: privacy@jungmocha.co.kr</li>
          <li>전화: 02-1234-5678</li>
        </ul>
      </section>

      <section>
        <h2>7. 쿠키 사용 안내</h2>
        <p>
          정모차는 사용자 경험 향상을 위해 쿠키를 사용합니다. 브라우저 설정을
          통해 저장 거부가 가능하며, 이 경우 일부 서비스 이용이 제한될 수
          있습니다.
        </p>
      </section>

      <section>
        <h2>8. 고지 의무</h2>
        <p>
          본 개인정보처리방침은 법령, 정책 또는 보안 기술의 변경에 따라 변경될
          수 있으며, 변경 시 최소 7일 전에 공지합니다.
        </p>
      </section>
    </main>
  );
}
