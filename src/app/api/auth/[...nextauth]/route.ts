// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Tên này chỉ dùng nội bộ, không quan trọng
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      
      /**
       * Hàm này được gọi khi bạn dùng signIn() trong Login.tsx
       */
      async authorize(credentials, req) {
        if (!credentials) return null;

        try {
          // 1. GỌI API LOGIN CỦA JAVA
          // LoginController của bạn dùng @RequestParam, nên chúng ta gửi
          // dữ liệu dạng 'application/x-www-form-urlencoded'
          const params = new URLSearchParams();
          params.append('email', credentials.email);
          params.append('password', credentials.password);
          
          const res = await fetch(
            "http://localhost:8080/api/login/sign_in", // <-- URL API Java của bạn
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: params,
            }
          );

          const responseData = await res.json();
          
          // 2. KIỂM TRA PHẢN HỒI TỪ JAVA
          // Dựa theo LoginController, bạn trả về { success: true, data: {...} }
          if (responseData.success === true && responseData.data) {
            
            const userData = responseData.data;
            
            // 3. Trả về object user cho NextAuth để nó tạo session
            return {
              id: userData.userId,
              name: userData.fullName || null, // Lấy tên nếu BE có trả về
              email: userData.email,
              accessToken: userData.token, // Đây là token JWT từ Java
            };
          } else {
            // Đăng nhập thất bại, BE trả về { success: false, data: "lỗi..." }
            // Ném lỗi với thông báo từ BE
            throw new Error(responseData.data || "Email hoặc mật khẩu không đúng");
          }

        } catch (e: any) {
          // Bắt các lỗi khác (lỗi mạng, BE sập...)
          console.error("Lỗi authorize:", e.message);
          throw new Error(e.message || "Đăng nhập thất bại");
        }
      },
    }),
  ],

  /**
   * Callbacks để thêm dữ liệu (id, token Java) vào session
   */
  callbacks: {
    async jwt({ token, user }) {
      // Khi đăng nhập, `user` object (từ `authorize`) sẽ có ở đây
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Gửi thông tin này về client (ví dụ: Header, trang Profile)
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).accessToken = token.accessToken;
      }
      return session;
    },
  },

  /**
   * Cấu hình trang
   */
  pages: {
    // Trỏ về trang chủ (nơi có Modal) thay vì trang lỗi mặc định của NextAuth
    signIn: "/",
    error: "/", 
  },
  session: {
    strategy: "jwt",
  },
  
  // RẤT QUAN TRỌNG: Thêm secret của bạn vào
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };