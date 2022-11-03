import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LectureCard from "../../components/LectureCard";
import { fetchLectures } from "../api/lecture";

function lecturesPage() {
  const [lectures, setlectures] = useState([]);
  const router = useRouter()
  useEffect(() => {
    fetchLectures().then((data) => {
      setlectures(data);
    });
  }, [router.isReady]);
  return (
    <div>
      {lectures.map((details) => (
        <LectureCard
          key={details.lectureId}
          title={details.name}
          link={"/lectures/" + details.slug}
          date={details.eventDateTime}
        />
      ))}
    </div>
  );
}

export default lecturesPage;
