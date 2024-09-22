"use client"; // Ensure this component runs on the client side
import { useState, useEffect } from 'react';
import { Table, Button, notification } from 'antd';
import Loader from './Loader';
import ReloadButton from './reload';

interface User {
  _id: string;
  email: string;
  name: string;
}

const AdminsDashboard = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPendingUsers = async () => {
    try {
      const response = await fetch('/api/user');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers(); // Fetch data on component mount
  }, []);

  const approve = async (userId: string) => {
    const response = await fetch(`/api/user/approve?id=${userId}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to approve user');
    fetchPendingUsers(); // Refetch data after action
  };

  const deleteUser = async (userId: string) => {
    const response = await fetch(`/api/user/delete?id=${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    fetchPendingUsers(); // Refetch data after action
  };

  const handleApprove = async (userId: string) => {
    try {
      await approve(userId);
      notification.success({ message: 'User approved successfully!' });
    } catch (error: any) {
      notification.error({ message: error.message });
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      notification.success({ message: 'User deleted successfully!' });
    } catch (error: any) {
      notification.error({ message: error.message });
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ReloadButton />;

  const columns = [
    {
      title: 'الاسم',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      key: 'actions',
      render: (text: any, record: User) => (
        <span>
          <Button
            onClick={() => handleApprove(record._id)}
            className='bg-gold-500 hover:bg-gold-500/90 text-white'
            style={{ marginRight: 8 }}
          >
            الموافقه
          </Button>
          <Button
            onClick={() => handleDelete(record._id)}
            className='bg-red-600 hover:bg-red-700 text-white'
          >
            حذف نهائيا
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={users || []}
        columns={columns}
        rowKey="_id"
        className={"text-white bg-white/10"}
      />
    </div>
  );
};

export default AdminsDashboard;
