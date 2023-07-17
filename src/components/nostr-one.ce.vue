<template>
  <button
    :class="classes"
    type="button"
    @click="handleClick"
    :disabled="!nip07Enabled"
    :title="nip07Enabled ? 'Login using Nostr' : 'NIP07 not detected'"
  >
    <NostrIcon class="icon"></NostrIcon>
    <slot> Login with Nostr </slot>
  </button>
</template>

<script setup lang="ts">
import axios, { type AxiosError } from "axios";
import NostrIcon from "./nostr-icon.vue";
import { nip98 } from "nostr-tools";
import { onMounted, ref } from "vue";

declare global {
  interface Window {
    nostr?: any;
  }
}

onMounted(() => {
  if (window.nostr) {
    nip07Enabled.value = true;
  }
});

const nip07Enabled = ref<boolean>(false);

const { loginUrl, classes, httpMethod, onClick, onError, onSuccess } =
  defineProps({
    loginUrl: {
      type: String,
      required: true,
    },
    httpMethod: {
      type: String,
      default: "post",
    },
    classes: {
      type: String,
      default: "nostr-one",
    },
    onClick: {
      type: Function,
      default: undefined,
    },
    onSuccess: {
      type: Function,
      default: undefined,
    },
    onError: {
      type: Function,
      default: undefined,
    },
  });

function handleSuccess(data: unknown) {
  if (onSuccess && typeof onSuccess === "function") {
    onSuccess(data);
  }
}
function handleAxiosError(error: AxiosError) {
  handleError({ code: error.code, message: error.message });
}
function handleError(error: { code: string | undefined; message: string }) {
  const obj = { code: error.code, message: error.message };
  if (onError && typeof onError === "function") {
    onError(obj);
  }
}

async function handleClick() {
  let eventB64 = "";
  try {
    eventB64 = await nip98.getToken(loginUrl, httpMethod, (e) =>
      window.nostr?.signEvent(e)
    );
  } catch (error: string | any) {
    handleError({ code: "nip98_error", message: error });
    return;
  }

  if (onClick && typeof onClick === "function") {
    onClick(eventB64);
    return;
  }

  const httpOptions = {
    headers: {
      Authorization: `Nostr ${eventB64}`,
    },
  };
  if (httpMethod === "get") {
    try {
      const result = await axios.get(loginUrl, httpOptions);
      handleSuccess(result.data);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  } else if (httpMethod === "post") {
    try {
      const result = await axios.post(loginUrl, {}, httpOptions);
      handleSuccess(result.data);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  } else {
    console.error("Unsupported http method");
  }
}
</script>

<style scoped lang="scss">
@use "sass:math";

$violet-primary-color: #5d0c8b;
$white: #fff;

$violet-primary-color-hover: mix(
  $white,
  $violet-primary-color,
  math.percentage(math.div(2, 10))
);
$violet-primary-color-disabled: mix(
  $white,
  $violet-primary-color,
  math.percentage(math.div(5, 10))
);
.nostr-one {
  cursor: pointer;
  background-color: $violet-primary-color;
  color: $white;
  border: none;
  padding: 12px 19px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: $violet-primary-color-hover;
  }

  &:disabled {
    background-color: $violet-primary-color-disabled;
    cursor: not-allowed;

    &:hover {
      background-color: $violet-primary-color-disabled;
    }
  }

  .icon {
    height: 20px;
  }
}
</style>
