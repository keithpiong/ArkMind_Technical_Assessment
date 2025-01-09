import React, { useEffect, useState } from 'react';
import { Button } from "antd";
import { Card } from 'antd';
import { Item } from '../types/models';
import NewItemModal from '../components/NewItemModal';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const ListPage: React.FC = () => {

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        <div className='w-full flex justify-end'>
          <Button type="primary" onClick={showModal}>Create</Button>
          <NewItemModal 
            isVisible={isModalVisible} 
            finishCreating={okModal} 
            onCancel={cancelModal}
          >
          </NewItemModal>
        </div>
        <h1 className='text-black text-xl font-medium mb-12'>Items</h1>
        {items.length === 0 ? (
          <div className="text-slate-600">
            <p>No items available. Click the 'Create' button to add items into this list.</p>
          </div>
        ) : (
        <div className='grid grid-cols-4 gap-12'>
          {items.map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              onClick={() => handleCardClick(item.id)}
            >
              <Meta title={item.name} description={item.description} />
              <p className='mt-4'>${item.price}</p>
            </Card>
          ))}
        </div>)}
      </div>
    </div>
  );
};

export default ListPage; 
