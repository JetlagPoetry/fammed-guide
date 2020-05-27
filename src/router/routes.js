import DesktopApp from '../components/desktop/DesktopApp.vue';
import MobileApp from '../components/mobile/MobileApp.vue';
import DesktopHome from '../components/desktop/DesktopHome.vue';
import DesktopGuide from '../components/desktop/DesktopGuide.vue';
import Summary from '../components/desktop/Summary.vue';
import mobile_list1 from '../components/mobile/GuideList1.vue';
// import mobile_list2 from '../components/mobile/GuideList2.vue';

const routes = [
    { 
        name: 'desktop', 
        path: '/desktop', 
        component: DesktopApp,
        redirect: '/home',
        children:[
            { name: 'home', path: '/home', component: DesktopHome },
            { name: 'guide', path: '/guide', component: DesktopGuide },
            { name: 'summary', path: '/summary', component: Summary },
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