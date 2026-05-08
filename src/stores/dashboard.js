import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios";
import { handleError } from "vue";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        statistic: null,
        loading: false,
        error: null,
        succes: null,
    }),

    actions: {
        async fetchStatistics() {
            this.loading = true;

            try {
                const response = await axiosInstance.get('dashboard/statistic')

                this.statistic = response.data.data
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        }
    }
})