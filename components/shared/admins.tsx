"use client"; // Ensure this component runs on the client side

import { useQuery, useMutation } from '@tanstack/react-query';
import { Table, Button, notification } from 'antd';
import Loader from './Loader';
import ReloadButton from './reload';

interface User {
  _id: string;
  email: string;
  name: string;
}

const fetchPendingUsers = async () => {
  const response = await fetch('/api/users/pending'); // Ensure you have this endpoint set up
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

const AdminDashboard = () => {
  const { data: users, isLoading, error,refetch } = useQuery<User[]>({queryKey:['pendingUsers'],queryFn:()=> fetchPendingUsers()});

  const approve = async (userId: string) => {
    const response = await fetch(`/api/users/approve?id=${userId}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to approve user');
    refetch()
    return response.json();
}

const deleteUser =async (userId: string) => {
    const response = await fetch(`/api/users/delete?id=${userId}`, {
        method: 'DELETE',
    });
    refetch()
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  }

  const handleApprove = async (userId: string) => {
    try {
      await approve(userId);
      notification.success({ message: 'User approved successfully!' });
      // Optionally refetch users after mutation
    } catch (error:any) {
      notification.error({ message: error.message });
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      notification.success({ message: 'User deleted successfully!' });
      // Optionally refetch users after mutation
    } catch (error:any) {
      notification.error({ message: error.message });
    }
  };

  if (isLoading) return <Loader/>;
  if (error) return <ReloadButton/>;

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
          <Button onClick={() => handleApprove(record._id)} className=' bg-gold-500 hover:bg-gold-500/90 text-white' style={{ marginRight: 8 }} >
            الموافقه
          </Button>
          <Button onClick={() => handleDelete(record._id)} className=' bg-red-600 hover:bg-red-700 text-white'>
            حذف نهائيا
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div >
      {/* <h1>Pending User Approvals</h1> */}
      <Table  dataSource={users} columns={columns} rowKey="_id" className={"text-white bg-white/10"} />
    </div>
  );
};

export default AdminDashboard;