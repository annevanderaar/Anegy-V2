<template>
  <v-card>
    <v-footer color="secondary">
      <v-row justify="center" no-gutters>
        <v-col cols="12" class="text-center mt-2">
          ©{{ new Date().getFullYear() }} — <strong>Anegy</strong>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-img
            class="my-3"
            max-width="100px"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-
            8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
          />
        </v-col>
      </v-row>
    </v-footer>
  </v-card>
</template>
