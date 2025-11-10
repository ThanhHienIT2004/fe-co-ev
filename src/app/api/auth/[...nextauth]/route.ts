import NextAuth, { AuthOptions } from "next-auth" // Thêm AuthOptions
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        console.log(`Attempting login for: ${credentials.email}`);
7
        try {
          const params = new URLSearchParams();
          params.append("email", credentials.email);
          params.append("password", credentials.password);

          const res = await fetch("http://localhost:8080/user/login/sign_in", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
          });

          if (!res.ok) {
            console.error(
              "================ LỖI TỪ BACKEND ================"
            );
            console.error(
              "Backend login failed with status:",
              res.status,
              res.statusText
            );
            const errorBody = await res.text();
            console.error("Backend error response body:", errorBody);
            console.error(
              "================================================="
            );
            return null;
          }

          const json = await res.json();

          if (!json.success || !json.data) {
            console.error(
              "================ LỖI LOGIC PHẢN HỒI ================"
            );
            console.error("Backend response 'success' is false or no 'data'");
            console.error(
              "Response JSON received:",
              JSON.stringify(json, null, 2)
            );
            console.error(
              "================================================="
            );
            return null;
          }

          console.log("Login successful, user data received from LOGIN API.");

          return {
            id: json.data.userId.toString(),
            email: json.data.email,
            name: json.data.fullName || json.data.email,
            accessToken: json.data.token,

          };
        } catch (err: any) {
          console.error(
            
            "================ LỖI TRONG HÀM AUTHORIZE ================"
          );
          console.error(
            "Error in authorize function (fetch failed or json parse failed):",
            err.message
          );
          console.error(err);
          console.error(
            "================================================="
          );
          
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.name = user.name;

        try {
          console.log("JWT Callback: Đang lấy profile cho user:", user.id);
          const profileRes = await fetch(
            `http://localhost:8080/user/${user.id}/profile`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          );

          if (profileRes.ok) {
            const profile = await profileRes.json();
            console.log("JWT Callback: Lấy profile thành công:", profile.full_name);
            token.name = profile.full_name || user.name;
          } else {
            console.error(
              "JWT Callback: Lấy profile thất bại",
              profileRes.status
            );
          }
        } 
        catch (error) {
          console.error("JWT Callback: Lỗi khi lấy profile:", error);
        }
      }

      return token;
    },
 
    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          id: token.id as string, 
          name: token.name,
          email: token.email || "",
        };
        session.accessToken = token.accessToken as string; 
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };