import axios from "axios";

export function fetchFaqs() {
  return new Promise(async (resolve, reject) => {
    let {data} = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/api/faqs?populate=*&pagination[pageSize]=10"
    );
    const faqs = data?.data?.map((items,index)=>{
      return{
        ...items.attributes,
        faqsId:items.id,
        faqIndex:index + 1
      }
    })
    resolve(faqs)
  });
}
