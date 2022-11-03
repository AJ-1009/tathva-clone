import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { lectureSlug } from "../api/lecture";
import styles from "../../components/lecture/lecture-slug.module.css";
const monthName = [
  "JAN",
  "FEB",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
export default function Slug() {
  const [details, setdetails] = useState(null);
  const [date, setdate] = useState();
  const [month, setmonth] = useState();
  const [year, setyear] = useState();
  const [time, settime] = useState();
  const [loading, setloading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    lectureSlug(router.query.slug).then((data) => {
      setdetails(data);
      setloading(false);    
    });
    const d = new Date(details?.eventDateTime);
    setmonth(monthName[d.getMonth()]);
    setdate(d.getDate());
    setyear(d.getFullYear());
    settime(d.getTime());
  }, [router.isReady]);
  if (!loading) {
    return (
      <div>
        <div className={styles["speaker-wrapper"]}>
          <div className={styles["name"]}>{details?.name}</div>
          <div className={styles["img-wrapper"]}>
            <div
              className={styles["img"]}
              style={{ backgroundImage: `url(${details?.speakerUrl})` }}
            ></div>
          </div>
          <div
            className={styles["img-1"]}
            style={{ backgroundImage: `url(${details?.posterUrl})` }}
          ></div>
          <div>
            <Notch heading={"speaker"} />
            <div className={styles["name"]}> {details?.speakerName} </div>
          </div>
        </div>
        <Notch heading={"lecture details"} />
        <div className={styles["lecture-details"]}>
          <div className={styles["details"]}>
            <div className={styles["event-heading"]}>date</div>
            <div className={styles["event"]}>
              {date}
              {"  "}
              {month}
              {"  "}
              {year}
              {"  "}
            </div>
          </div>
          <div className={styles["details"]}>
            <div className={styles["event-heading"]}>time</div>
            <div className={styles["event"]}></div>
          </div>
          <div className={styles["details"]}>
            <div className={styles["event-heading"]}>venue</div>
            <div className={styles["event"]}>{details?.venue}</div>
          </div>
        </div>
        <Notch heading={"about the speaker"} />
        <Points array={details?.speakerAbout} />
        <Notch heading={"description"} />
        {details?.description?(<div className={styles["description"]}>{details?.description}</div>):(<div className={styles['description']}>N/A</div>)}
        <Notch heading={"contact"} />
        <div className={styles["lecture-details"]}>
          {details?.contacts.map((info) => (
            <div className={styles["details"]} key={info.id}>
              <div className={styles["event-heading"]}> {info.name} </div>
              <div className={styles["event"]}>{info.phoneNo} </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function Notch({ heading }) {
  return (
    <div className={styles["notch"]}>
      <div className={styles["notch-heading"]}>{heading}</div>
    </div>
  );
}

function Points({ array }) {
  return (
    <div>
      {array?.map((details) => (
        <div key={details.id} className={styles["points"]}>
          {details.speakerInfo}
        </div>
      ))}
    </div>
  );
}
