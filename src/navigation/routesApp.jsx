import {Tap} from '@/pages/Tap/Tap.jsx';
import {Boost} from "@/pages/Boost/Boost.jsx";
import {Stats} from "@/pages/Stats/Stats.jsx";
import {Tasks} from "@/pages/Tasks/Tasks.jsx";
import {Referral} from "@/pages/Referral/Referral.jsx";


/**
 * @typedef {object} Route
 * @property {string} path
 * @property {import('react').ComponentType} Component
 * @property {string} [title]
 * @property {import('react').JSX.Element} [icon]
 */

/**
 * @type {Route[]}
 */
export const RoutesApp = [
    {path: '/', Component: Tap},
    // {path: '/trophy', Component: Ref},
    {path: '/boost', Component: Boost},
    {path: '/stat', Component: Stats},
    {path: '/task', Component: Tasks},
    {path: '/referral', Component: Referral},
];
