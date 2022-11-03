import axios from "axios";

export function fetchFaqs() {
  return new Promise(async (resolve, reject) => {
    let {data} = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/api/faqs?populate=*&pagination[pageSize]=10"
    );
    console.log(data)
  });
}
