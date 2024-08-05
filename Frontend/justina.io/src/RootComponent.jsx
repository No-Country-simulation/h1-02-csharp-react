import useUserStore from "./store/useUserStore";
import { Login, Home } from "./pages";
import Layout from "./layouts/Layout";

export default function RootComponent() {
  const { token, user } = useUserStore();
  const isNotAuthenticated = !token || user == null;

  return isNotAuthenticated ? (
    <Login />
  ) : (
    <Layout>
      <Home />
    </Layout>
  );
}
