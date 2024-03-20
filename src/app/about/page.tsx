import Ad from "@/components/Ad";
import type { ReactElement } from "react";
import Logo from "@/components/Logo";
import styles from "@/styles/about.module.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-B2KK9DNYZ1");
ReactGA.send({
  hitType: "pageview",
  page: "/",
  title: "Custom Title",
});
export default function About(): ReactElement {
  return (
    <div className={styles.contents}>
      <Logo />
      <Ad />
    </div>
  );
}
