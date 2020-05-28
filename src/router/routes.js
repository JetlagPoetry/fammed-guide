import DesktopApp from '../components/desktop/DesktopApp.vue';
import DesktopHome from '../components/desktop/DesktopHome.vue';
import DesktopGuide from '../components/desktop/DesktopGuide.vue';
import Summary from '../components/desktop/Summary.vue';

import MobileApp from '../components/mobile/MobileApp.vue';
import MobileHome from '../components/mobile/MobileHome.vue';
import MobileGuideList from '../components/mobile/MobileGuideList.vue';
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
        redirect: '/mobile/home',
        children:[
            { name: 'mobile_home', path: 'home', component: MobileHome},
            { name: 'mobile_guide', path: 'guide', component: MobileGuideList},
            // { name: 'list2', path: 'list2', component: mobile_list2}
        ] 
    }
    
];

export default routes;