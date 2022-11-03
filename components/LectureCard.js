import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./lecture-card.module.css";
const monthName = [
  "jan",
  "feb",
  "march",
  "april",
  "may",
  "june",
  "july",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
function LectureCard({ date, title, link }) {
  const [newdate, setnewdate] = useState();
  const [newmonth, setnewmonth] = useState();
  useEffect(() => {
    const d = new Date(date);
    setnewdate(d.getDate());
    setnewmonth(monthName[d.getMonth()]);
  }, [date]);
  return (
    <div>
      <div className={styles["date-wrapper"]}>
        <div className={styles["date"]}>
          {" "}
          {newdate} {"  "} {newmonth}
        </div>
      </div>
      <div className={styles["name"]}>{title}</div>
      <Link href={link}>
        <div className={styles["register"]}>register</div>
      </Link>
      <Link href={link}>
        <div className={styles["learn-more"]}>learn more</div>
      </Link>
    </div>
  );
}

export default LectureCard;
