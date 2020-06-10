import Home from '../components/common/Home.vue';
import Summary from '../components/common/Summary.vue';

import DesktopApp from '../components/desktop/DesktopApp.vue';
import DesktopGuide from '../components/desktop/DesktopGuide.vue';


import MobileApp from '../components/mobile/MobileApp.vue';
import MobileGuideList from '../components/mobile/MobileGuideList.vue';

const routes = [
    { 
        name: 'desktop', 
        path: '/desktop', 
        component: DesktopApp,
        redirect: '/home',
        children:[
            { name: 'home', path: '/home', component: Home },
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
            { name: 'mobile_home', path: 'home', component: Home},
            { name: 'mobile_guide', path: 'guide', component: MobileGuideList},
            { name: 'mobile_summary', path: 'summary', component: Summary},
        ] 
    }
    
];

export default routes;