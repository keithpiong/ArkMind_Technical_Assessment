import React, { useEffect, useState } from 'react';
import { Button } from "antd";
import { Card } from 'antd';
import { Item } from '../types/models';
import NewItemModal from '../components/NewItemModal';
import { useNavigate } from 'react-router-dom';

const ListPage: React.FC = () => {

  const [items, setItems] = useState<Item[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const okModal = () => {
    fetchItems()
    setIsModalVisible(false);
  };

  const cancelModal = () => {
    setIsModalVisible(false)
  }

  const handleCardClick = (itemId: number) => {
    navigate(`/items/${itemId}`);
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items`);
      const data = await response.json();

      const formattedItems = data.map((item: Item) => ({
        id: item.id,
        name: item.name,
        price: `${item.price}`,
        description: item.description
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='mx-auto w-full min-h-screen flex flex-col'>
      <div className='flex flex-col w-full max-w-screen-lg mx-auto p-8'>
        <div className='w-full flex justify-between mb-8'>
         <h1 className='text-body text-xl font-medium '>Items</h1>
          <Button type="primary" onClick={showModal}>Create</Button>
          <NewItemModal 
            isVisible={isModalVisible} 
            finishCreating={okModal} 
            onCancel={cancelModal}
          >
          </NewItemModal>
        </div>
        
        {items.length === 0 ? (
          <div className="text-slate-600">
            <p>No items available. Click the 'Create' button to add items into this list.</p>
          </div>
        ) : (
        <div className='grid grid-cols-4 gap-12'>
          {items.map((item) => (
            <Card
              className='bg-secondary text-body'
              bordered={false}
              key={item.id}
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              onClick={() => handleCardClick(item.id)}
            >
              <p className='text-lg font-bold'>{item.name}</p>
              <p className='mt-6 text-sm tracking-wide'>{item.description}</p>
              <p className='mt-2 text-sm font-bold'>${item.price}</p>
            </Card>
          ))}
        </div>)}
      </div>
    </div>
  );
};

export default ListPage; 
