import Home from '../components/Home.vue';
import Summary from '../components/Summary.vue';

// import DesktopApp from '../components/DesktopApp.vue';
import DesktopGuide from '../components/GuidePage.vue';

// import MobileApp from '../components/mobile/MobileApp.vue';
// import MobileGuideList from '../components/mobile/MobileGuideList.vue';

const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'guide', path: '/guide', component: DesktopGuide },
    { name: 'summary', path: '/summary', component: Summary },
];


export default routes;