import axios from "axios";

export function fetchLectures() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
          "/api/lectures?populate=*&pagination[pageSize]=50"
      );
      const lectures = data.data.map((details) => {
        return {
          lectureId: details.id,
          ...details.attributes,
          coverUrl:
            `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
            details?.attributes?.coverImage?.data?.attributes?.url,
        };
      });
      resolve(lectures);
    } catch {}
  });
}

export function lectureSlug(slug) {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/lectures/slug/${slug}?populate=*`
    );
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
        `/api/lectures/${res.data.result.id}?populate=*`
    );
    const lectures = {
      ...data.data.attributes,
      lectureId: data.data.id,
      posterUrl:
      `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
        data.data?.attributes?.posterImages?.data[0]?.attributes?.url,
      speakerUrl:
      `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
        data.data?.attributes?.speakerImage?.data?.attributes?.url,
    };
    resolve(lectures);
  });
}
