const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [

        {
            name: 'Login',
            path: '/auth/login',
            component: () => import('@/views/authentication/BoxedLogin.vue')
        },
        {
            name: 'Register',
            path: '/auth/register',
            component: () => import('@/views/denuncia/denun.vue')
        },
        {
            name: 'DenunciaForm',
            path: '/denuncia/denunciaForm',
            component: () => import('@/views/denuncia/DenunciaForm.vue')
        }
    ]
};

export default AuthRoutes;
