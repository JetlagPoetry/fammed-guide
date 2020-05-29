import DesktopApp from '../components/desktop/DesktopApp.vue';
import DesktopHome from '../components/desktop/DesktopHome.vue';
import DesktopGuide from '../components/desktop/DesktopGuide.vue';
import DesktopSummary from '../components/desktop/DesktopSummary.vue';

import MobileApp from '../components/mobile/MobileApp.vue';
import MobileHome from '../components/mobile/MobileHome.vue';
import MobileGuideList from '../components/mobile/MobileGuideList.vue';
import MobileSummary from '../components/mobile/MobileSummary.vue';

const routes = [
    { 
        name: 'desktop', 
        path: '/desktop', 
        component: DesktopApp,
        redirect: '/home',
        children:[
            { name: 'home', path: '/home', component: DesktopHome },
            { name: 'guide', path: '/guide', component: DesktopGuide },
            { name: 'summary', path: '/summary', component: DesktopSummary },
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
            { name: 'mobile_summary', path: 'summary', component: MobileSummary},
        ] 
    }
    
];

export default routes;