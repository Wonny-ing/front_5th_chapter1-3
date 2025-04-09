import React, { useState } from "react";
import { generateItems } from "./utils";
import PageLayout from "./components/PageLayout.tsx";
import ComplexForm from "./components/ComplexForm.tsx";
import ItemList from "./components/ItemList.tsx";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:pr-4">
          <ItemList items={items} onAddItemsClick={addItems} />
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <ComplexForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default App;
