<template>
    <div>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
                <v-row>
                    <v-text-field v-model="nameValue" style="margin-left: 10pt;" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
                    <v-text-field v-model="practiceOversValue" style="margin-left: 10pt;" :counter="10" :rules="nameRules" label="Overs Bowled (Practice)" required></v-text-field>
                    <v-text-field v-model="competitionOversValue" style="margin-left: 10pt;" :counter="10" :rules="nameRules" label="Overs Bowled (Competition)" required></v-text-field>
                    <v-btn @click="addToArray" style="margin-top: 8pt; margin-left: 10pt;">Add Row</v-btn>
                </v-row>
            </v-container>
        </v-form>
        <div class="row">
            <v-col cols="12" md="6">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Name
                                </th>
                                <th>
                                    Overs In Practice
                                </th>
                                <th>
                                    Overs In Competition
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableArray" :key="item.getName()">
                                <td>{{ item.getName() }}</td>
                                <td>{{ item.getPracticeOvers() }}</td>
                                <td>{{ item.getCompetitionOvers() }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </div>
    </div>
</template>

<script>
    import OversArray from '../DataType/OversArray'
    export default {
        name: 'MyView',
        data() {
            return {
                nameValue: "",
                practiceOversValue: "",
                competitionOversValue: "",
                tableArray: []
            }
        },
        methods: {
            addToArray() {
                console.log(this.nameValue);
                console.log(this.competitionOversValue);
                console.log(this.practiceOversValue);
                if (this.validate())
                {
                    let arrayToAdd = new OversArray(this.nameValue, this.practiceOversValue, this.competitionOversValue);
                    this.tableArray.push(arrayToAdd);
                }
            },
            validate()
            {
                if (this.nameValue == "" || this.practiceOversValue == "" || this.competitionOversValue == "")
                {
                    return false;
                }
                if (this.nameValue.length > 16 || parseInt(this.practiceOversValue) < 16 || !(0 > parseInt(this.competitionOversValue) < 100))
                {
                    return false;
                }
                return true;
            }
        }
    }
</script>