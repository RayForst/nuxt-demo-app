<template lang="pug">
  form.ui-form.row.center-xs(
    @submit.prevent="save"
  )
    .col-xs-12.form-group
      input(
        :placeholder="$t('contacts.form.fullname')"
        name="fullname"
        v-model="form.fullname.value"
        required
      )
    .col-xs-12.form-group
      input(
        :placeholder="$t('contacts.form.email')"
        name="email"
        v-model="form.email.value"
        required
      )
    .col-xs-12.form-group
      textarea(
        :placeholder="$t('contacts.form.message')" 
        name="text"
        v-model="form.text.value"
        required
      )
    .col-xs-12.form-group
      template(v-if="success")
        .success {{ $t('contacts.form.success') }}
      template(v-else)
        button.ui-button.ui-button--big.ui-button--full-green(
          style="min-width:220px;"
        ) {{ $t('contacts.form.button') }}
</template>

<script>
export default {
  name: "contact-request",
  data() {
    return {
      success: false,
      serverError: null,
      form: {
        fullname: {
          value: null,
          error: null
        },
        email: {
          value: null,
          error: null
        },
        text: {
          value: null,
          error: null
        }
      }
    };
  },
  methods: {
    async save() {
      this.clearErrors();

      let data = {
        fullname: this.form.fullname.value,
        email: this.form.email.value,
        text: this.form.text.value
      };

      this.$emit("contact-form-submit", data);
    },
    clearErrors() {
      this.serverError = "";
      for (var index in this.form) {
        this.form[index].error = null;
      }
    },
    clearForm() {
      for (var index in this.form) {
        if (index !== "type") this.form[index].value = null;
      }
    },
    resetForm() {
      this.success = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.success {
  font-size: 22px;
  font-family: "Lora", sans-serif;
  font-weight: bold;
  color: green;
  text-align: center;
  letter-spacing: 0.025em;
}

form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
