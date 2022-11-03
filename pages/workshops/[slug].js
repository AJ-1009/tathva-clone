import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { workshopSlug } from "../api/workshop";

export default function slug() {
  const router = useRouter();
  const [workshop, setworkshop] = useState(null);
  useEffect(() => {
    if (!router.isReady) return;
    workshopSlug(router.query.slug).then((data) => {
      setworkshop(data);
    });
  }, [router.isReady]);
  return (
    <div>
      {console.log(workshop)}
      <div>hello</div>
    </div>
  );
}
