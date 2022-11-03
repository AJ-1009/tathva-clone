import axios from "axios";

export function fetchEvents() {
  return new Promise(async (resolve, reject) => {
    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
        "/api/events?populate=*&pagination[pageSize]=100"
    );
    const events = data?.data.map((items) => {
      return {
        eventId: items.id,
        coverUrl:
          `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
          items?.attributes?.coverImage?.data?.attributes?.url,
        ...items.attributes,
      };
    });
    resolve(events);
  });
}

export function eventSlug(slug) {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/events/slug/${slug}?populate=*`
    );
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `/api/events/${res?.data?.result?.id}?populate=*`
    );
    const events = {
      ...data?.data?.attributes,
      eventId: data?.data?.id,
      coverUrl:process.env.NEXT_PUBLIC_BACKEND_URL + data?.data?.attributes?.coverImage?.data?.attributes?.url,
      guidelinesPdfUrl : process.env.NEXT_PUBLIC_BACKEND_URL + data?.data?.attributes?.guidelinesPdf?.data?.attributes?.url,
      posterUrl : data?.data?.attributes?.posterImages?.data.map((image)=>{
        return{...image?.attributes}
      })
    };
    resolve(events)
  });
}
