'use client';

import { Input, Button, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { RegisterFormInputs, registerSchema } from '@/lib/validation/user';
import Link from 'next/link';

const { Title } = Typography;

export default function RegisterPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (values: RegisterFormInputs) => {
    // Show loading toast while the request is being processed
    const loadingToastId = toast.loading('Registering user...');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        // On success, update the loading toast to show success message
        toast.update(loadingToastId, {
          render: 'Registration successful! Your account is pending approval.',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        });
        reset(); // Reset the form
        router.push('/login'); // Redirect to home or login, but access is restricted until approval
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (error: any) {
      // On error, update the loading toast to show error message
      toast.update(loadingToastId, {
        render: error.message || 'Failed to register. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 min-w-[500px] max-sm:min-w-[350px] p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title level={1} className="mb-4 text-center text-gold-500" style={{ color: '#d4aa48' }}>
        Register
      </Title>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-bold text-gold-500">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={`border ${errors.name ? 'border-red-500' : 'border-gold-500'} w-full p-2`}
              />
            )}
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-gold-500">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                className={`border ${errors.email ? 'border-red-500' : 'border-gold-500'} w-full p-2`}
              />
            )}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-gold-500">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className={`border ${errors.password ? 'border-red-500' : 'border-gold-500'} w-full p-2`}
              />
            )}
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-gold-500">Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gold-500'} w-full p-2`}
              />
            )}
          />
          {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button htmlType="submit" block className="bg-gold-500 hover:bg-gold-500/80 border-none">
            Register
          </Button>
        </motion.div>
        <div className="mt-4 text-center">
        <p className="text-gold-500">Already have an account? <Link href="/login" className="text-gold-500 hover:underline">Login here</Link></p>
      </div>
      </form>
    </motion.div>
  );
}
