"use client";

import { Input, Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("عنوان البريد الإلكتروني غير صالح").min(1, "البريد الإلكتروني مطلوب"),
  password: z.string().min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (values: LoginFormInputs) => {
    const loadingToastId = toast.loading("جاري تسجيل الدخول...");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const data = await res.json();

        // تحقق مما إذا كان المستخدم معتمدًا
        if (data.isApproved) {
          toast.update(loadingToastId, {
            render: "تم تسجيل الدخول بنجاح!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          router.push("/dashboard");
        } else {
          // إذا لم يكن معتمدًا، أظهر رسالة توست للانتظار
          toast.update(loadingToastId, {
            render: "حسابك قيد الانتظار للموافقة. يرجى الانتظار.",
            type: "info",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        const data = await res.json();
        toast.update(loadingToastId, {
          render: data.message || "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        
      }
    } catch (error: any) {
      toast.update(loadingToastId, {
        render: error.message || "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        type: "error",
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
      transition={{ duration: 0.6 }}>
      <Title
        level={1}
        className="mb-4 text-center text-gold-500"
        style={{ color: "#d4aa48" }}>
        تسجيل الدخول
      </Title>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-bold text-gold-500">
            البريد الإلكتروني
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                className={`border ${
                  errors.email ? "border-red-500" : "border-gold-500"
                } w-full p-2`}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-gold-500">
            كلمة المرور
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className={`border ${
                  errors.password ? "border-red-500" : "border-gold-500"
                } w-full p-2`}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-gold-500 border-none">
            تسجيل الدخول
          </Button>
        </motion.div>
        <div className="text-center mt-4 flex gap-3 justify-center">
              {"ليس لديك حساب؟ "}
          <Link href="/register" className="text-gold-500 hover:underline">
              {"سجل هنا."}
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
