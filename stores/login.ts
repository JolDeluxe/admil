// stores/authStore.js
import { useToast } from "vue-toast-notification";
export const useAuthStore = defineStore("auth", () => {
  const authToken = useCookie("s-login");
  const toast = useToast();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch("/api/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      if (response.token) {
        authToken.value = response.token;
        toast.success("Login exitoso!");
        router.push("/usuarios");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      toast.error("Usuario o contraseña incorrectos.");
    }
  };

  return {
    login,
  };
});
