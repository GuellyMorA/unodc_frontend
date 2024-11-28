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
            name: 'AdministracionAdmUsuario',
            path: '/administracion/admUsuario',
            requiresAuth: true,
            component: () => import('@/views/administracion/Index.vue')
        },
        {
            name: 'AdministracionAdmUsuario2',
            path: '/administracion/admUsuario2',
            requiresAuth: true,
            component: () => import('@/views/administracion/Usuario.vue')
        },
        {
            name: 'DenunciaFormDenuncia',
            path: '/denuncia/formDenuncia',
            //requiresAuth: true,
            component: () => import('@/views/denuncia/FormDenuncia.vue')
        },
        {
            name: 'seguimiento',
            path: '/denuncia/seguimiento',
            requiresAuth: true,
            component: () => import('@/views/denuncia/Index.vue'),
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
