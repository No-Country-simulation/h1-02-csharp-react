import useUserStore from "./hooks/useUserStore";
import { Landing, Home } from "./pages";
import Layout from "./layouts/Layout";

export default function RootComponent() {
  const { token, user } = useUserStore();
  const isNotAuthenticated = !token || user == null;

  return isNotAuthenticated ? (
    <Landing />
  ) : (
    <Layout>
      <Home />
    </Layout>
  );
}
