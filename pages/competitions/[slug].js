import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { competitionSlug } from "../api/competition";

import styles from "../../components/competitions/slug.module.css" 

function Slug() {
  const router = useRouter();
  const [competition,setcompetition] = useState(null)
  useEffect(() => {
    if (!router.isReady) return;
    competitionSlug(router.query.slug).then((data) => {
      setcompetition(data)
    });
  }, [router.isReady]);
  return (
    <div>
      {console.log(competition)}
      <div className={styles['prize-wrapper']}>
        <div>
          <div className={styles['']}></div>
        </div>
      </div>
    </div>
  )
}

export default Slug;
