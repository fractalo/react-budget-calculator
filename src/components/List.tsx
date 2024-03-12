import { useEffect, useState } from "react";
import { Item } from "../types/item";

interface Props {
  items: Item[];
  onClickModify: (item: Item) => void;
  onClickDelete: (id: string) => void;
  onClickClear: () => void;
}

export default function List({ 
  items,
  onClickModify,
  onClickDelete,
  onClickClear,
}: Props) {
  const [ totalExpenditure, setTotalExpenditure ] = useState(0);

  useEffect(() => {
    setTotalExpenditure(items.reduce((sum, item) => sum + item.price, 0));
  }, [items]);

  return (
    <div className="flex flex-col gap-8 w-full p-4 md:p-6 border rounded-md">
      <ul className="flex flex-col gap-2 foverflow-y-auto">
        {items.map(item => {
          return (
            <li className="flex items-center justify-between w-full border p-2 rounded-sm hover:scale-105 transition-transform" key={item.id}>
              <div className="flex grow shrink items-center">
                <span className="w-1/2 font-semibold">{item.name}</span>
                <span className="w-1/2">{item.price}</span>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-neutral" onClick={() => onClickModify(item)}>수정</button>
                <button className="btn btn-error" onClick={() => onClickDelete(item.id)}>삭제</button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap-reverse justify-between items-center gap-4 w-full">
        <button disabled={!items.length} className="btn btn-error" onClick={() => onClickClear()}>
          전체 삭제
        </button>

        <span className="text-2xl">
          총지출: 
          <span className="font-semibold"> {totalExpenditure}</span>
          원
        </span>
      </div>
    </div>
  );
}
