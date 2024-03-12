import { useState } from 'react'
import './App.css'
import Form from './components/Form';
import List from './components/List';
import { Item } from './types/item';

export default function App() {
  const [ items, setItems ] = useState<Item[]>([]);
  const [ editingItem, setEditingItem ] = useState<Item | null>(null);

  const handleSubmit = (submittedItem: Item) => {
    const index = items.findIndex(item => item.id === submittedItem.id);

    if (index !== -1) {
      items[index] = submittedItem;
    } else {
      items.push(submittedItem);
    }

    setItems([...items]);
    setEditingItem(null);
  };

  const handleClickModify = (item: Item) => {
    setEditingItem(item);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <div className="max-w-2xl mx-auto max-h-screen max-md:px-2">
      <div className="py-4">
        <h1 className="text-3xl font-bold">
          예산 계산기
        </h1>
      </div>

      <div className="flex flex-col py-4 gap-4">
        <Form 
          item={editingItem}
          onSubmit={handleSubmit}
        />
        <List 
          items={items} 
          onClickModify={handleClickModify} 
          onClickDelete={deleteItem}
          onClickClear={clearItems}
        />
      </div>
    </div>
  );
}
