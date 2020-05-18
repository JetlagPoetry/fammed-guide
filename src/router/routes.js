import DesktopApp from '../components/desktop/DesktopApp.vue';
import MobileApp from '../components/mobile/MobileApp.vue';
import desktop_home from '../components/desktop/HomePage.vue';
import desktop_guide from '../components/desktop/GuidePage.vue';
import desktop_summary from '../components/desktop/Summary.vue';
import mobile_list1 from '../components/mobile/GuideList1.vue';
// import mobile_list2 from '../components/mobile/GuideList2.vue';

const routes = [
    { 
        name: 'desktop', 
        path: '/desktop', 
        component: DesktopApp,
        redirect: '/home',
        children:[
            { name: 'home', path: '/home', component: desktop_home },
            { name: 'guide', path: '/guide', component: desktop_guide },
            { name: 'summary', path: '/summary', component: desktop_summary },
        ] 
    },
    { 
        name: 'mobile', 
        path: '/mobile', 
        component: MobileApp,
        redirect: '/mobile/list1',
        children:[
            { name: 'list1', path: 'list1', component: mobile_list1},
            // { name: 'list2', path: 'list2', component: mobile_list2}
        ] 
    }
    
];

export default routes;