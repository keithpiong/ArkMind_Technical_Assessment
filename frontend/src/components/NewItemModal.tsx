
import React, { useContext, useState } from 'react';
import type { FormProps } from 'antd';
import { Input, Modal, Form, InputNumber, Button} from 'antd';
import { Item } from '../types/models';
import { NotificationContext } from '../layouts/main';


interface NewItemModalProps {
  isVisible: boolean;
  finishCreating: () => void;
  onCancel:() => void;
}

type FieldType = {
  name?: string;
  description?: string;
  price?: string;
};


const NewItemModal: React.FC<NewItemModalProps> = ({ 
  isVisible,
  finishCreating,
  onCancel
}) => {

  const [loading, setLoading] = useState<boolean>(true);
  const notificationApi = useContext(NotificationContext);

  const onFinish = (values:Item) => {
    createNewItem(values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const createNewItem = async (dataItem: Item) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataItem),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the item');
      }
  
      finishCreating();
      notificationApi?.success({
        message: 'Success',
        description: 'Item successfully updated.',
      });
    } catch (error) {
      console.error('Error updating item:', error);
      notificationApi?.error({
        message: 'Error',
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Create New Item" open={isVisible} footer={null} onCancel={onCancel}>
      <div className='mt-8'>
        <Form
          className='flex flex-col'
          name="basic"
          style={{ maxWidth: 800 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p className='mb-2 font-medium text-slate-500'>Name: </p>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please add name.' }]}
          >
            <Input />
          </Form.Item>

          <p className='mt-4 mb-2 font-medium text-slate-500'>Description: </p>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please add description.' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <p className='mb-2 font-medium text-slate-500'>Price: </p>
          <Form.Item
            name="price"
            rules={[{ required: true, message: 'Please add price.' }]}
          >
            <InputNumber
              precision={2}
              style={{ width: '100%' }}
              formatter={(value) => {
                const numericValue = typeof value === 'number' ? value : parseFloat(value || '0');
                return `$${numericValue.toFixed(2)}`;
              }}
              parser={(value) => {
                if (!value) return ''; // Handle empty string case
                return parseFloat(value.replace(/[^0-9.]/g, '')) || 0; // Remove all non-numeric characters
              }}
            />
          </Form.Item>

          <div className='self-end flex'>
            <Button className='mr-4' type="default" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" >
              Create Item
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default NewItemModal;
