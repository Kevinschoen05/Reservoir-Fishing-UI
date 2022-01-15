<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ["chartData", "options"],
  watch: {
    chartData() {
      this.renderChart(this.chartData, this.options);
    },
  },
  async mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>