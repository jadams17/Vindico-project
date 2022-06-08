<template>
    <div>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
                <v-row>
                    <v-text-field v-model="name" style="margin-left: 10pt;" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
                    <v-text-field v-model="name" style="margin-left: 10pt;" :counter="10" :rules="nameRules" label="Overs Bowled (Practice)" required></v-text-field>
                    <v-text-field v-model="name" style="margin-left: 10pt;" :counter="10" :rules="nameRules" label="Overs Bowled (Competition)" required></v-text-field>
                    <v-btn @click="resetValidation" style="margin-top: 8pt; margin-left: 10pt;">Add Row</v-btn>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>