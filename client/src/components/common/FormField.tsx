interface Proptypes {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const FormField = ({
  type = "text",
  onChange,
  value,
  label,
  name,
  placeholder,
}: Proptypes) => {
  return (
    <div className="flex flex-col">
      <label className="" htmlFor={name}>
        {label}
      </label>
      <input
        className="border-[1px] border-indigo-600 focus-visible:border-amber-400 outline-none py-1 px-2 rounded-sm transition-all focus-visible:shadow-md focus-visible:shadow-indigo-200"
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;
