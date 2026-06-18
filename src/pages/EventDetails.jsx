import { useParams } from "react-router";

const EventDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="font-heading text-4xl">Event Details</h1>
      <p className="font-text">Details for event {id} will go here.</p>
    </div>
  );
};

export default EventDetails;
