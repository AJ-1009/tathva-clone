import axios from "axios";
export function fetchworkshop() {
  return new Promise(async (resolve, reject) => {
    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
        "/api/workshops?populate=*&pagination[pageSize]=50"
    );
    let response = data.data?.map((details) => {
      return {
        workshopId: details.id,
        ...details.attributes,
        coverUrl:
          `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
          details.attributes?.coverImage?.data?.attributes?.url,
        title: details.attributes.name,
      };
    });
    resolve(response);
  });
}

export function workshopSlug(slug) {
  return new Promise(async (resolve, reject) => {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
        `/api/workshops/slug/${slug}?populate=*`
    );
    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
        `/api/workshops/${response.data?.result?.id}?populate=*`
    );
    const workshop = {
      ...data.data.attributes,
      workshopId: data.id,
      coverUrl:
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
        data?.data?.attributes?.coverImage?.data?.attributes?.url,
      posterUrl:
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
        data?.data?.attributes?.posterImage?.data.attributes?.url,
      seatsLeft:
        data?.data?.attributes?.maxRegCount -
        data?.data?.attributes?.currRegCount,
    };
    resolve(workshop);
  });
}
