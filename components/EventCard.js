import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./event-card.module.css";

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

function EventCard({
  eventDate,
  category,
  coverUrl,
  title,
  slug,
  showRegFee,
  regClosed,
  regFee,
  comingSoon,
}) {
  const [date, setdate] = useState("");
  const [month, setmonth] = useState("");
  const [fee, setfee] = useState();
  const [type, settype] = useState();
  useEffect(() => {
    const d = new Date(eventDate);
    setmonth(monthName[d.getMonth()]);
    setdate(d.getDate());
    if (regFee == 0) {
      setfee("FREE REG");
    } else if (regFee == "null") {
      setfee("N/A");
    } else {
      setfee("Rs. " + regFee);
    }

    category ? settype(category) : settype("N/A");
  }, [slug]);

  if (!comingSoon) {
    return (
      <div className={styles["card-wrapper"]}>
        <div className={styles["date-wrapper"]}>
          <div className={styles["dashed-1"]}></div>
          <div className={styles["event-date"]}>
            {date} {month}{" "}
          </div>
        </div>
        <div className={styles["upper-container"]}>
          <div className={styles["upper-wrapper"]}>
            <div
              className={styles["img"]}
              style={{ backgroundImage: `url(${coverUrl})` }}
            ></div>
            <div className={styles["category-container"]}>
              <div className={styles["category"]}>{type}</div>
            </div>
            <div className={styles["title"]}>{title}</div>
            {showRegFee && <div className={styles["fees"]}>{fee}</div>}
          </div>
        </div>
        <div className={styles["footer"]}>
          <Link href={slug}>
            <div className={styles["learn-more"]}>learn more</div>
          </Link>
          <Link href={slug}>
            {!regClosed ? (
              <div className={styles["register"]}>register</div>
            ) : (
              <div className={styles["reg-closed"]}>reg closed</div>
            )}
          </Link>
        </div>
      </div>
    );
  }
}

export default EventCard;
