import { useEffect, useState } from "react";
import { Item } from "../types/item";

interface Props {
  item: Item | null;
  onSubmit: (item: Item) => void;
}

export default function Form({
  item, 
  onSubmit,
}: Props) {

  const [ name, setName ] = useState<string>('');
  const [ price, setPrice ] = useState<number | string>('');

  useEffect(() => {
    setName(item?.name ?? '');
    setPrice(item?.price ?? '');
  }, [item]);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    const priceNum = Number(price);
    if (!name || isNaN(priceNum)) return;

    onSubmit({
      id: item?.id ?? window.crypto.randomUUID(),
      name,
      price: priceNum,
    });

    setName('');
    setPrice('');
  };

  return (
    <form className="flex max-md:flex-col md:items-center gap-4 justify-between w-full p-4 border rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold whitespace-nowrap">지출 항목</span>
        <input 
          type="text" 
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          className="py-1.5 px-2 border outline-none rounded-sm"
          required
        ></input>
      </div>
      <div className="flex items-center gap-2 shrink">
        <span className="font-semibold whitespace-nowrap">비용</span>
        <input 
          type="number" 
          value={price}
          onChange={e => setPrice(Number(e.currentTarget.value))}
          className="py-1.5 px-2 border outline-none rounded-sm"
          required
        ></input>
      </div>
      <button 
        className="btn btn-primary"
      >
        {item ? '수정' : '추가'}
      </button>
    </form>
  );
}