const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            requiresAuth: true,
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'AdmUsuario',
            path: '/administracion/index',
            requiresAuth: true,
            component: () => import('@/views/administracion/Index.vue')
        },
        {
            name: 'AdmUsuarioForm',
            path: '/administracion/admUsuarioForm',
            requiresAuth: true,
            component: () => import('@/views/administracion/Usuario.vue')
        },
        {
            name: 'AdmRolForm',
            path: '/administracion/admRolForm',
            requiresAuth: true,
            component: () => import('@/views/administracion/Rol.vue')
        },
        {
            name: 'AdmPerfilForm',
            path: '/administracion/admPerfilForm',
            requiresAuth: true,
            component: () => import('@/views/administracion/Perfil.vue')
        },


        {
            name: 'DenunciaForm',
            path: '/denuncia/denunciaForm',
            //requiresAuth: true,
            component: () => import('@/views/denuncia/DenunciaForm.vue')
        },
        {
            name: 'Seguimiento',
            path: '/denuncia/seguimiento',
            requiresAuth: true,
            component: () => import('@/views/denuncia/Index.vue'),
        },
   
        {
            name: 'AdmDenunciaForm',
            path: '/denuncia/admDenunciaForm',
            requiresAuth: true,
            component: () => import('@/views/denuncia/DenunciaDerivacion.vue')
        },
        {
            name: 'DenunciaSeguimiento',
            path: '/denuncia/denunciaSeguimiento',
            requiresAuth: true,
            component: () => import('@/views/denuncia/DenunciaSeguimiento.vue'),
        },
         {
            name: 'DenunciaConclusion',
            path: '/denuncia/denunciaConclusion',
            requiresAuth: true,
            component: () => import('@/views/denuncia/DenunciaConclusion.vue'),
        },
        {
            name: 'Reportes',
            path: '/reportes/reportesDash',
            requiresAuth: true,
            component: () => import('@/views/reportes/Index.vue')
        },
        {
            name: 'ReportesEst',
            path: '/reportes/estadisticas',
            requiresAuth: true,
            component: () => import('@/views/reportes/Estadisticas.vue')
        },
        {
            name: 'ReportesMapa',
            path: '/reportes/mapa',
            //requiresAuth: true,
            component: () => import('@/views/reportes/Mapa.vue')
        },



        {
            name: 'ViolenciaJerarquica-Dashboard',
            path: '/violencia/jerarquica/dashboard',
            requiresAuth: true,
            component: () => import('@/views/violencia-jerarquica/Dashboard.vue')
        },
 
        {
            name: 'Buttons',
            path: '/ui/buttons',
            component: () => import('@/views/ui-components/Buttons.vue')
        },
        {
            name: 'Cards',
            path: '/ui/cards',
            component: () => import('@/views/ui-components/Cards.vue')
        },
        {
            name: 'Tables',
            path: '/ui/tables',
            component: () => import('@/views/ui-components/Tables.vue')
        },
        {
            name: 'Icons',
            path: '/icons',
            component: () => import('@/views/pages/Icons.vue')
        },
        {
            name: 'Starter',
            path: '/sample-page',
            component: () => import('@/views/pages/SamplePage.vue')
        },
       
    ]
};

export default MainRoutes;
