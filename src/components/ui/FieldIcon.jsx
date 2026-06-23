// A colored rounded-square that holds a field's leading icon, sitting flush at
// the left edge inside a daisyUI `input`. Pass the icon as children; `tone`
// selects the palette: 'blue' for the core fields, 'yellow' for the optional
// coordinate fields.
const FieldIcon = ({ children, tone = 'blue' }) => {
  const tones = {
    blue: 'bg-brand-blue text-white',
    yellow: 'bg-brand-yellow text-brand-brown',
  };

  return (
    <span
      className={`flex size-8 shrink-0 items-center justify-center rounded-lg [&>svg]:size-4 ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

export default FieldIcon;
