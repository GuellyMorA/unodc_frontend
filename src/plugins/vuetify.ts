import { createVuetify } from 'vuetify';


import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { BLUE_THEME } from '@/theme/LightTheme';

//import { VueRecaptcha } from 'vue-recaptcha';
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
//import { VDateInput } from 'vuetify/labs/VDateInput'
//import DayJsAdapter from '@date-io/dayjs'
//import VueMoment from 'vue-moment';
//import moment from 'moment';
//import { useDate } from 'vuetify/labs/useDate'
//import AirDatepicker from 'air-datepicker';
//import HighchartsVue from "highcharts-vue";

export default createVuetify({
 components : {
        VDataTable,
        VDatePicker,
        //AirDatepicker
      //  HighchartsVue
     /*   date: {
        adapter: DayJsAdapter,
      }, 
*/
      },
    directives,
 
    theme: {
        defaultTheme: 'BLUE_THEME',
        themes: {
            BLUE_THEME,
        }
    },
    defaults: {
        VCard: {
            rounded: 'xl'
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VListItem: {
            minHeight: '45px'
        },
        VTooltip: {
            location: 'top'
        }
    }
});
