import Home from '../components/Home.vue';
import Guide from '../components/Guide.vue';
import Summary from '../components/Summary.vue';
import Feedback from '../components/Feedback.vue';
import FeedbackResult from '../components/FeedbackResult.vue';

const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'guide', path: '/guide', component: Guide },
    { name: 'summary', path: '/summary', component: Summary },
    { name: 'feedback', path: '/feedback', component: Feedback },
    { name: 'feedbackresult', path: '/feedback/result', component: FeedbackResult },
];


export default routes;