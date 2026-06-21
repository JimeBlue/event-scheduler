// A single labelled detail on the event page: blue icon + uppercase label,
// with the value underneath. Reused for Date & Time, Location, etc.
const InfoRow = ({ icon, label, value }) => {
  // JSX needs a capitalised tag, so alias the icon prop to <Icon />.
  const Icon = icon;

  return (
    <div className="flex items-start gap-3">
      <Icon className="size-6 shrink-0 text-brand-blue-dark" />
      <div>
        <p className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-blue-dark">
          {label}
        </p>
        <p className="mt-1 font-text text-brand-brown-dark">{value}</p>
      </div>
    </div>
  );
};

export default InfoRow;
