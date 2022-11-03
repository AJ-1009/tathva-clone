import { useEffect, useState } from "react";
import { fetchEvents } from "../api/events";
import EventCard from "../../components/EventCard";

function index() {
  const [events, setevents] = useState([]);
  useEffect(() => {
    fetchEvents().then((data) => {
      setevents(data);
    });
  }, []);

  return (
    <div>
      <div className="card-wrapper">
        {events.map((details) => (
          <EventCard
            key={details.eventId}
            coverUrl={details.coverUrl}
            title={details.name}
            eventDate={details.eventDate}
            slug={"/events/" + details.slug}
            category={details.category}
            showRegFee={true}
            regClosed={details.regClosed}
            regFee={details.regPrice}
            comingSoon={details.isResultPublished}
          />
        ))}
      </div>
    </div>
  );
}

export default index;
