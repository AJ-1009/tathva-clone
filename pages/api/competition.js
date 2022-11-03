import axios from "axios";
export function fetchcompetitions() {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
          "/api/competitions?populate=*&pagination[pageSize]=100"
      );
      const competition = data.data.map((item) => {
        return {
          competitionId: item.id,
          ...item.attributes,
          coverUrl:
            `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
            item.attributes?.coverImage?.data?.attributes?.url,
        };
      });
      resolve(competition);
    } catch {
      console.log("slow internet");
    }
  });
}

export function competitionSlug(slug) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
          `/api/competitions/slug/${slug}?populate=*`
      );
      let { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
          `/api/competitions/${response.data?.result?.id}?populate=*`
      );
      const competitions = {
        ...data.data.attributes,
        competitionId: data.data?.id,
        posterUrl: data?.data?.attributes?.posterImages?.data?.map((images) => {
          return {
            ...images.attributes,
          };
        }),
        guidelinesPdfUrl:
        `${process.env.NEXT_PUBLIC_BACKEND_URL}`+
          data?.data?.attributes?.guidelinesPdf?.data?.attributes?.url,
        coverUrl:
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
          data?.data?.attributes?.coverImage?.data?.attributes?.url,
      };
      resolve(competitions);
    } catch {}
  });
}
