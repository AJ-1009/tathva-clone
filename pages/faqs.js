import { useEffect, useState } from "react";
import { fetchFaqs } from "./api/faqs";

const categories = [
  "ALL",
  "GENERAL",
  "COMPETITIONS",
  "WORKSHOPS",
  "LECTURES",
  "ROBOWARS",
  "PROSHOWS",
];

export default function faqs() {
  const [faqs, setfaqs] = useState([]);
  const [filteredfaq, setfilteredfaq] = useState([]);
  const [filter, setfilter] = useState("ALL");
  const [length, setlength] = useState(0);
  useEffect(() => {
    fetchFaqs().then((data) => {
      setfaqs(data);
    });
  }, []);
  useEffect(() => {
    const filtered = [];
    faqs.map((item) => {
      if (filter != "ALL") {
        if (item.category == filter) {
          filtered.push(item);
        }
      } else {
        filtered.push(item);
      }
    });
    setfilteredfaq(filtered);
  }, [filter, faqs]);
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {categories.map((items) => (
          <FilterItem
            label={items}
            check={items == filter}
            onClick={() => setfilter(items)}
            key={items}
          />
        ))}
      </div>
      <div>
        {filteredfaq.map((faq, index) => (
          <OpenFaq
            question={faq.question}
            answer={faq.answer}
            key={index}
            onClick={() => setlength(faq.faqIndex)}
            check={faq.faqIndex == length}
          />
        ))}
      </div>
    </div>
  );
}

function FilterItem({ label, check, onClick }) {
  return (
    <div className={`filter ${check ? "check" : ""}`} onClick={onClick}>
      {label}
    </div>
  );
}

function OpenFaq({ question, answer,check,onClick }) {
  return (
    <div>
      <div className="question" onClick={onClick} >{question}</div>
      <div className={`answer ${check ? "faq-check" : ""}`} >{answer}</div>
    </div>
  );
}
