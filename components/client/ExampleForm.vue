<template lang="pug">
.example-form-wrap
    div
        h2 Test from component
        ValidationObserver(
            v-slot="{ passed }"
        )
            form.i-form
                ValidationProvider(
                    rules="email"
                    name="example field name"
                    v-slot="{ errors, passed, invalid }"
                ) 
                    .i-form-input(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                    )
                        input(
                            type="text"
                            data-vv-as="Address Line 1" 
                            v-model="email"
                            placeholder="demo field"
                        )
                    span.i-form-error-message {{ errors[0] }}
                button(type="submit" :disabled="!passed") Button test
</template>

<script>
export default {
  name: "example-form",
  data() {
    return {
      email: ""
    };
  }
};
</script>
