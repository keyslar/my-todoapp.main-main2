<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const userStore = useUserStore();
const router = useRouter();

async function handleLogin() {
  if (firstName.value.trim() && lastName.value.trim()) {
    await userStore.login({
      firstName: firstName.value,
      lastName: lastName.value,
    });
    router.push("/todos");
  } else {
    alert("Lütfen ad ve soyad giriniz.");
  }
}
</script>
