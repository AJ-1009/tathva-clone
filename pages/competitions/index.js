import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import { fetchcompetitions } from "../api/competition";

const categories = [
  "All",
  "General",
  "Chemical",
  "Civil",
  "Computer Science",
  "Electrical",
  "Electronics",
  "Finance",
  "Gaming",
  "Mechanical",
  "Physics",
  "Research",
  "Robotics",
  "Misc",
];

export default function CompetitionPage() {
  const [competitions, setcompetitions] = useState([]);
  const [shownIndividual, setshownIndividual] = useState([]);
  const [shownCommon, setshownCommon] = useState([]);
  const [filter, setfilter] = useState("All");
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetchcompetitions().then((data) => {
      setcompetitions(data);
      setloading(false);
    });
  }, []);
  useEffect(() => {
    const individual = [];
    const common = [];
    const filtered = [];
    competitions.map((details) => {
      if (filter != "All") {
        if (details.category == filter) {
          filtered.push(details);
        }
      } else {
        filtered.push(details);
      }
    });
    filtered.map((details) => {
      details.tathvaIdtype ? common.push(details) : individual.push(details);
    });
    setshownIndividual(individual);
    setshownCommon(common);
  }, [competitions, filter]);
  if (!loading) {
    return (
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {categories.map((item) => (
            <FilterItem
              label={item}
              check={item == filter}
              onClick={() => setfilter(item)}
              key={item}
            />
          ))}
        </div>
        <div className="registration">COMMON REGISTRATION</div>
        <div className="card-wrapper">
          {shownCommon.map((details) => (
            <EventCard
            key={details.competitionId}
              coverUrl={details.coverUrl}
              title={details.title}
              eventDate={details.eventDate}
              slug={"/competitions/"+details.slug}
              category={details.category}
              showRegFee={false}
              regClosed={details.regClosed}
              regFee={details.regFee}
              comingSoon={details.comingSoon}
          />
          ))}
        </div>
        <div className="registration">INDIVIDUAL REGISTRATION</div>
        <div className="card-wrapper">
          {shownIndividual.map((details) => (
            <EventCard
              key={details.competitionId}
              coverUrl={details.coverUrl}
              title={details.title}
              eventDate={details.eventDate}
              slug={"/competitions/"+details.slug}
              category={details.category}
              showRegFee={false}
              regClosed={details.regClosed}
              regFee={details.regFee}
              comingSoon={details.comingSoon}
            />
          ))}
        </div>
      </div>
    );
  }
}
function FilterItem({ label, check, onClick }) {
  return (
    <div className={`filter ${check ? "check" : ""}`} onClick={onClick}>
      {label}
    </div>
  );
}
