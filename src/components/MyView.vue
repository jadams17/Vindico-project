<template>
    <div>
        <v-form ref="form" lazy-validation>
            <v-container>
                <v-row>
                    <v-text-field v-model="nameValue" style="margin-left: 10pt;" :counter="10" label="Name" required></v-text-field>
                    <v-text-field v-model="practiceOversValue" style="margin-left: 10pt;" :counter="10" label="Overs Bowled (Practice)" required></v-text-field>
                    <v-text-field v-model="competitionOversValue" style="margin-left: 10pt;" :counter="10" label="Overs Bowled (Competition)" required></v-text-field>
                    <v-btn @click="addToArray" style="margin-top: 8pt; margin-left: 10pt;">Add Row</v-btn>
                </v-row>
            </v-container>
        </v-form>
        <div class="row">
            <v-col v-if="tableArray.length > 0" cols="12" md="6" style="padding-left: 20pt;">
                <apexcharts :options="chartOptions" :series="series"></apexcharts>
            </v-col>
            <v-col v-if="tableArray.length > 0" cols="12" md="6">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>
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
                            <tr v-for="item in tableArray" :key="item.getName()" style="text-align:center">
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
    import VueApexCharts from 'vue-apexcharts'
    export default {
        name: 'MyView',
        data() {
            return {
                nameValue: "",
                practiceOversValue: "",
                competitionOversValue: "",
                tableArray: [],
                chartArray1: [],
                chartArray2: [],
                nameArray: [],
                series: [],
                chartOptions: {},
            }
        },
        components: {
          apexcharts: VueApexCharts,
        },
        methods: {
            addToArray() {
                if (this.validate())
                {
                    //Create the array object
                    let arrayToAdd = new OversArray(this.nameValue, this.practiceOversValue, this.competitionOversValue);
                    //Adds the relevant data to each array
                    //Done this way to make it easier in each section
                    this.tableArray.push(arrayToAdd);
                    this.chartArray1.push(parseInt(this.practiceOversValue));
                    this.chartArray2.push(parseInt(this.competitionOversValue));
                    this.nameArray.push(this.nameValue);
                    this.loadChartData();
                    this.nameValue = "";
                    this.practiceOversValue = "";
                    this.competitionOversValue = "";
                }
            },
            validate()
            {
                //Check for null values
                if (this.nameValue == "" || this.practiceOversValue == "" || this.competitionOversValue == "")
                {
                    return false;
                }
                //check for length, min value and min/max value or name, practice overs and competition overs respectively
                if (this.nameValue.length > 16 || parseInt(this.practiceOversValue) < 16 || !(0 > parseInt(this.competitionOversValue) < 100))
                {
                    return false;
                }
                return true;
            },
            loadChartData()
            {
                // eslint-disable-next-line no-unused-vars
                const vm = this;
                
                //Reset series and add the arrays to it
                this.series = [];
                this.series.push({
                    name: "Practice Over Value",
                    data: this.chartArray1
                });
                this.series.push({
                    name: "Competition Over Value",
                    data: this.chartArray2
                });
            
                //chart options
                this.chartOptions = {
                    chart: {
                        type: 'bar',
                        height: 700,
                        stacked: true,
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        },
                    },
                        stroke: {
                        width: 1,
                        colors: ['#fff']
                    },
                    title: {
                        text: 'Overs Bowled Per Team'
                    },
                    xaxis: {
                        categories: this.nameArray,
                        title:
                        {
                            text: "Overs Bowled"
                        }
                    },
                    yaxis: {
                        title: {
                            text: "Team"
                        },
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val
                            }
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left',
                        offsetX: 40
                    }
                };   
            },
        }
    }
</script>