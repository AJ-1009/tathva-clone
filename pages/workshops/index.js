import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import { fetchworkshop } from "../api/workshop";

const categories = [
  "All",
  "Web development",
  "Robotics",
  "Product development",
  "Web 3.0",
  "Digital designing",
  "Miscellaneous",
];

function Index() {
  const [workshops, setworkshops] = useState([]);
  const [filter, setfilter] = useState("All");
  const [filteredworkshop, setfilteredworkshop] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetchworkshop().then((data) => {
      setworkshops(data);
      setloading(false);
    });
  }, []);

  useEffect(() => {
    const data = [];
    workshops.map((details) => {
      if (filter != "All") {
        if (details.category == filter) {
          data.push(details);
        }
      } else {
        data.push(details);
      }
    });
    setfilteredworkshop(data);
  }, [workshops, filter]);
  if (!loading) {
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
        <div className="card-wrapper">
          {filteredworkshop.map((details) => (
            <EventCard
              key={details.workshopId}
              coverUrl={details.coverUrl}
              title={details.title}
              eventDate={details.eventDate}
              slug={"/workshops/" + details.slug}
              category={details.category}
              showRegFee={true}
              regClosed={details.regClosed}
              regFee={details.regPrice}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Index;

function FilterItem({ label, check, onClick }) {
  return (
    <div className={`filter ${check ? "check" : ""}`} onClick={onClick}>
      {label}
    </div>
  );
}
