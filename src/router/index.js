import { createWebHistory,createRouter } from "vue-router";

import ProductHome from '@/components/ProductHome.vue'
import ProductAoSoMi from '@/components/ProductAoSoMi.vue'
import ProductQuanShort from '@/components/ProductQuanShort.vue'
import ProductAoThun from '@/components/ProductAoThun.vue'
import ProductQuanJean from '@/components/ProductQuanJean.vue'
///////////////////////
import ProductDetailHome from '@/components/ProductDetailHome.vue'
import ProductDetailAoSoMi from '@/components/ProductDetailAoSoMi.vue'
import ProductDetailAoThun from '@/components/ProductDetailAoThun.vue'
import ProductDetailQuanJean from '@/components/ProductDetailQuanJean.vue'
import ProductDetailQuanShort from '@/components/ProductDetailQuanShort.vue'
////////////////////////////////
import ComCart from '@/components/ComCart.vue'
import ComPayment from '@/components/ComPayment.vue'
import ComLogin from '@/components/ComLogin.vue'
import OrderHistory from '@/components/ComOrderHistory'

//Tạo mảng chứa các link
const routes= [
    //Đối tượng
    // Nếu là trang chủ path="/"
    {
        path:"/",
        name:"ProductHome",
        component:ProductHome
        
    },
    //Những link còn lại không phải là trang chủ thì path:"/ten"
    {
        path:"/productAoSoMi",
        name:"ProductAoSoMi",
        component:ProductAoSoMi
    },
    {
        path:"/productAoThun",
        name:"ProductAoThun",
        component:ProductAoThun
    },
    {
        path:"/productQuanShort",
        name:"ProductQuanShort",
        component:ProductQuanShort
    },
    {
        path:"/productQuanJean",
        name:"ProductQuanJean",
        component:ProductQuanJean
    },//////////////////////////////
    {
        path:"/productDetailHome",
        name:"ProductDetailHome",
        component:ProductDetailHome,
    },
    {
        path:"/productDetailAoSoMi",
        name:"ProductDetailAoSoMi",
        component:ProductDetailAoSoMi,
    },
    {
        path:"/productDetailAoThun",
        name:"ProductDetailAoThun",
        component:ProductDetailAoThun,
    },
    {
        path:"/productDetailQuanJean",
        name:"ProductDetailQuanJean",
        component:ProductDetailQuanJean,
    },
    {
        path:"/productDetailQuanShort",
        name:"ProductDetailQuanShort",
        component:ProductDetailQuanShort,
    },
    {
        path:"/comCart",
        name:"ComCart",
        component:ComCart,
    },
    {
        path:"/comPayment",
        name:"ComPayment",
        component:ComPayment,
    },
    {
        path:"/comLogin",
        name:"ComLogin",
        component:ComLogin,OrderHistory
    },
    {
        path:"/orderHistory",
        name:"OrderHistory",
        component:OrderHistory,
    }
    
]

// Tạo đối tượng router
const router = createRouter({
    history:createWebHistory(),
    routes,
    scrollBehavior() {
        // Luôn cuộn về đầu trang khi điều hướng đến một route mới
        return { top: 0 };
    }
})

export default router
