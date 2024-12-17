type props = {
  item1: string;
  item2: string;
  value1: string;
  value2: string;
};

export default function Model({ item1, value1, value2, item2 }: props) {
  const capitalizeFirstLetter = (str: string) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  return (
    <>
      <tr className="flex flex-col print:flex-row md:flex-row">
        <td className="w-full border p-1 px-2 print:w-1/2 md:w-1/2">
          <span className="font-bold">{item1}: </span>
          <span className="pl-3">{capitalizeFirstLetter(value1)}</span>
        </td>
        <td className="w-full border p-1 px-2 print:w-1/2 md:w-1/2">
          <span className="font-bold">{item2}: </span>
          <span className="pl-3">{capitalizeFirstLetter(value2)}</span>
        </td>
      </tr>
    </>
  );
}
