import {
  LayoutDashboardIcon,BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
  BoxMultiple1Icon,
  LoginIcon, MoodHappyIcon, ApertureIcon, UserPlusIcon
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  BgColor?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
 // { header: 'Inicio' },
  {
    title: 'Inicio.',
    icon: LayoutDashboardIcon,
    BgColor: 'primary',
    to: '/'
  },
  /*{ header: 'Módulos' },
  */
  {
    title: "Administración",
    icon: UserPlusIcon,
    BgColor: 'primary',
    to: "/administracion/index",
  },

  {
    title: "Seguimiento",
    icon: AlertCircleIcon,
    BgColor: 'primary',
    to: "/denuncia/seguimiento",    
  },


  {
    title: "Form. Denuncias",
    icon: BoxMultiple1Icon,
    BgColor: 'primary',
    to: "/denuncia/denunciaForm",
  },  
  {
    title: "Reporte",
    icon: BoxMultiple1Icon,
    BgColor: 'primary',
    to: "/reportes/reportesDash",
  },

// {
//     title: 'Icons',
//     icon: MoodHappyIcon,
//     BgColor: 'primary',
//     to: '/icons'
// },
// {
//     title: 'Sample Page',
//     icon: ApertureIcon,
//     BgColor: 'primary',
//     to: '/sample-page'
// },

];

export default sidebarItem;
