import { FuseNavigationItem } from "@fuse/components/navigation";




export const compactNavigation: FuseNavigationItem[] = [{
    id      : 'comercial',
    title   : 'Comercial',
    type    : 'group',
    children: [
    {
        id      : 'terceros',
        title   : 'Contactos',
        type    : 'collapsable',
        icon : 'heroicons_outline:user-group',
        children: [
            {
                id   : 'client',
                title: 'Clientes',
                type : 'basic',
                link : 'contact/customer/all',
                button: {
                    icon: 'add_circle_outline',
                    link: 'contact/customer/new'
                }
            }
        ]
    },
    {
        id      : 'ventas',
        title   : 'Ventas',
        type    : 'collapsable',
        icon : 'shopping_cart',
        children: [
            {
                id   : 'pedidos',
                title: 'Pedidos',
                type : 'basic',
                link : 'sales/purchase/all',
                button:{
                    link:'sales/purchase/new'
                },
            },
           // {
           /*     id   : 'plan-separe',
                title: 'Cotizaciones',
                type : 'basic',
                link : '/plan-separe'
                */
          //  },
            // {
           /*
                id      : 'seguridad',
                title   : 'Recaudos',
                type    : 'basic',
                  */
          //  },
            // {
            //     id   : 'contra-entrega',
            //     title: 'Contra entrega',
            //     type : 'basic',
            //     icon : 'departure_board',
            //     link : '/contra-entrega'
            // },
             // {
            /*
                id   : 'list_alt',
                title: 'Precios',
                type : 'basic',
                link : '/lista-de-precios'
                */
                //  },
        ]
    },
    /*
        {
        id      : 'seguridad',
        title   : 'Bitácora',
        type    : 'basic',
        icon : 'menu_book',
    },
    {
        id      : 'reportes',
        title   : 'Reportes',
        type    : 'basic',
        icon : 'insert_chart_outlined',
    }*/
]

},
/*{
    id      : 'comercial',
    title   : 'Logistica',
    type    : 'group',
    children: [{
        id      : 'terceros',
        title   : 'Pedidos aprobados',
        icon:'checklist_rtl',
        type    : 'basic',
    }]
},
{
    id      : 'comercial',
    title   : 'PostVenta',
    type    : 'group',
    children: []
},*/
    {
        id      : 'seguridad',
        title   : 'Settings',
        type    : 'group',
        icon: 'settings',
        hidden: (item: any) => {
            const user_role: string = localStorage.getItem('user_role_id').toString();
                 return user_role != "a2fe2d9a-46c0-11ed-88f1-7b765a5d50e1";
        },
        children: [
            {
                id   : 'usuarios',
                title: 'Usuarios',
                type : 'basic',
                icon:'people',
                button:{
                    link:'settings/user/new'
                },
                link : 'settings/user/all'
            },
            {
                id   : 'tiendas',
                title: 'Tiendas',
                type : 'basic',
                icon:'store',
                link : 'settings/store/all'
                // button:{
                //     link:'settings/store/new'
                // },
            },
            {
                id   : 'precios_brilla',
                title: 'Precios Brilla',
                type : 'basic',
                icon:'attach_money',
                link : 'settings/brilla/all'
                // button:{
                //     link:'settings/store/new'
                // },
            },
            // {
            //     id   : 'setting',
            //     title: 'Account',
            //     type : 'basic',
            //     icon: 'verified_user',
            //     link : '/settings/account'
            // }
        ]
    }

];