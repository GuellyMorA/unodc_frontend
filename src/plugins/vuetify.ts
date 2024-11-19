import { createVuetify } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable'

import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { BLUE_THEME } from '@/theme/LightTheme';
import DayJsAdapter from '@date-io/dayjs'
import { VDatePicker } from 'vuetify/lib/labs/components.mjs';// Import the VDatePicker
//import { VueRecaptcha } from 'vue-recaptcha';

//import { VDatePicker } from 'vuetify/lib'; 



export default createVuetify({
 components : {
        VDataTable,
        VDatePicker,
      
        date: {
        adapter: DayJsAdapter,
      }, 

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
