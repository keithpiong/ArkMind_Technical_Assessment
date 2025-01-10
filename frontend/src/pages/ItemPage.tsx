// src/pages/HomePage.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Item } from '../types/models';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { NotificationContext } from '../layouts/main';
import { format } from 'date-fns';

const ItemPage: React.FC = () => {
  const [form] = Form.useForm();
  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const notificationApi = useContext(NotificationContext);

  const backButton = () => {
    navigate(`/items`);
  }

  const onFinish = (values: Item) => {
    updateItemById(values)
  };

  // Pop Up Functions
  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: 'Confirm Delete?',
      content: 'Are you sure you want to delete this item? Item will not be retrievable once deleted.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteItemById()
      },
      onCancel() {
      },
    });
  };

  
  const deleteItemById = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the item');
      }
      notificationApi?.success({
        message: 'Success',
        description: 'Item successfully deleted.',
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      notificationApi?.error({
        message: 'Error',
        description: `${error}`,
      });
    } finally {
      setLoading(false);
      navigate("/items")
    }
  };

  const updateItemById = async (updatedData: Item) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/${id}`, {
        method: 'PUT', // HTTP method for updating
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(updatedData), // Convert the updated data to JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the item');
      }
  
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

  useEffect(() => {
      const fetchItemById = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/${id}`);
          const data = await response.json();

          setItem(data);

          form.setFieldsValue({
            name: data.name,
            description: data.description,
            price: data.price,
          });
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchItemById();
  }, [id, form]);
  return (
    <div className='mx-auto w-full min-h-screen flex flex-col'>
      <div className='flex flex-col w-full max-w-screen-sm mx-auto text-black p-8'>
        <div className='w-full flex justify-between align-center mb-8'>
          <a className='hover:underline hover:cursor-pointer text-blue-600 hover:text-blue-900 text-sm' onClick={backButton}>back</a>
          <Button type="default" danger onClick={showDeleteConfirm} loading={loading}>Delete</Button>
        </div>
        <p className='text-sm text-slate-400'>Created on: {item?.createdAt ? format(new Date(item.createdAt), 'hh:mma, MMM-dd-yyyy') : 'N/A'}</p>
        <p className='text-sm text-slate-400 mb-8'>Updated on: {item?.updatedAt ? format(new Date(item.updatedAt), 'hh:mma, MMM-dd-yyyy') : 'N/A'}</p>
        <Form
          className='flex flex-col'
          form={form}
          name="item-form"
          layout="vertical"
          initialValues={{
            name: item?.name,
            description: item?.description,
            price: item?.price,
          }}
          onFinish={onFinish}
        >
            <p className='mb-2 font-medium text-slate-500'>Name: </p>
            <Form.Item
              className=''
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
                  if (!value) return ''; // Handle empty string
                  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0; // Remove all non-numeric characters
                }}
              />
            </Form.Item>

            <Form.Item className='self-end'>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update
              </Button>
            </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ItemPage; // Default export
