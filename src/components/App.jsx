import {useIntegration} from "@tma.js/react-router-integration";
import {
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars,
    bindViewportCSSVars,
    initClosingBehavior,
    initNavigator,
    useInitData,
    useMiniApp,
    useThemeParams,
    useViewport
} from '@tma.js/sdk-react';
import {useEffect, useMemo} from 'react';
import {Route, Router, Routes,} from 'react-router-dom';
import {NextUIProvider} from "@nextui-org/react";
import {useData} from "@/components/Context.jsx";
import {Trophies} from "@/components/Trophy/Trophy.jsx";
import LoadingComponent from "@/components/LoadingComponent.jsx";
import {Tap} from "@/pages/Tap/Tap.jsx";
import {Boost} from "@/pages/Boost/Boost.jsx";
import {Stats} from "@/pages/Stats/Stats.jsx";
import {Tasks} from "@/pages/Tasks/Tasks.jsx";
import {Referral} from "@/pages/Referral/Referral.jsx";
import Menu from "./Menu/Menu";

/**
 * @return {JSX.Element}
 */
export function App() {
    const miniApp = useMiniApp();
    const themeParams = useThemeParams();
    const viewport = useViewport();
    const [closingBehavior] = initClosingBehavior();

    useEffect(() => {
        closingBehavior.enableConfirmation();
    }, [closingBehavior]);

    useEffect(() => {
        return bindMiniAppCSSVars(miniApp, themeParams);
    }, [miniApp, themeParams]);

    useEffect(() => {
        return bindThemeParamsCSSVars(themeParams);
    }, [themeParams]);

    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
    const [location, reactNavigator] = useIntegration(navigator);

    useEffect(() => {
        navigator.attach();
        return () => navigator.detach();
    }, [navigator]);

    const {
        balanceInit,
        setGuruLeft,
        setRefillLeft,
        energyInit,
        balance,
        setLeague,
        userid,
        setUserId,
        guruLeft,
        fetched,
        setFetched,
        refillLeft,
        multiTap,
        setMultiTap,
        energy,
        energyLimit,
        setEnergyLimit,
        energySpeed,
        setEnergySpeed,
        autoBot,
        botUp,
        energyUp,
        setAutoBot,
        setFriends,
        setReferrals,
        amount,
        setTasks,
        setAmount,
        taskClaimed,
        setTaskClaimed,
        leagueClaimed,
        setLeagueClaimed,
        lastClick,
        refClaimed,
        setRefClaimed,
        loading,
        setLoading,
        loaded,
        setLoaded
    } = useData();

    const initData = useInitData();

    useEffect(() => {
        if (!fetched) {
            setFetched(true);
            const user_id = initData?.user?.id;
            setUserId(user_id);
            fetch(`https://api.spxswap.com/${user_id}`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setGuruLeft(data.guruleft);
                    setRefillLeft(data.refillleft);
                    setMultiTap(data.multi);
                    setEnergyLimit(data.limite);
                    setEnergySpeed(data.speed);
                    setAutoBot(data.bot);
                    setReferrals(data.refs.length);
                    setFriends(data.refs);
                    setAmount(data.amount);
                    for (let i = 0; i < Trophies.length; i++) {
                        if (data.amount <= Trophies[i].threshold) {
                            setLeague(i);
                            break;
                        }
                    }
                    setTaskClaimed(data.taskcl);
                    setLeagueClaimed(data.leaguecl);
                    setRefClaimed(data.referralcl);
                    let ener_now = energyInit(data.energy, data.lastonline, data.limite, data.speed);
                    balanceInit(data.balance, data.lastonline, data.bot, data.speed, ener_now, data.limite);
                    setLoading(false);
                });
        }
        setTasks([{
            id: 0, url: "https://t.me/airdrop_game_swap", title: "Join AirDrops", reward: 300000, typess: "tg",
        }, {
            id: 1, url: "https://t.me/spacexswap", title: "Join Our Channel!", reward: 400000, typess: "tg",
        }, {
            id: 2, url: "https://x.com/spacexswap1", title: "Follow Our X Handle", reward: 100000, typess: "x",
        }, {
            id: 3, url: "https://spxswap.com", title: "Visit Our Website", reward: 100000, typess: "o",
        },]);
    }, [initData, initData]);

    useEffect(() => {
        if (energy !== -1) {
            const interv = setTimeout(energyUp, 1000);
            return () => clearTimeout(interv);
        }
    }, [energySpeed, energyLimit, energy]);

    useEffect(() => {
        if (autoBot && energy !== -1) {
            const interva = setTimeout(botUp, 1000);
            return () => clearTimeout(interva);
        }
    }, [energySpeed, autoBot, amount, energy, energyLimit, lastClick, balance]);

    const saveData = () => {
        const userData = {
            guruLeft: guruLeft,
            refillLeft: refillLeft,
            limite: energyLimit,
            speed: energySpeed,
            multi: multiTap,
            bot: autoBot,
            referralCl: refClaimed,
            leagueCl: leagueClaimed,
            taskCl: taskClaimed,
            reward: 0,
            balance: balance,
            amount: amount,
            energy: energy,
            lastOnline: Number(new Date()),
        };

        fetch(`https://api.spxswap.com/${userid}`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    console.error("Failed to save data");
                }
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    };

    useEffect(() => {
        const intervalId = setTimeout(saveData, 1000);
        return () => clearTimeout(intervalId);
    }, [guruLeft, refillLeft, energyLimit, energySpeed, multiTap, autoBot, refClaimed, leagueClaimed, taskClaimed, lastClick,]);

    useEffect(() => {
        const intervalId = setTimeout(saveData, 1000);
        return () => clearTimeout(intervalId);
    }, [guruLeft, refillLeft, energyLimit, energySpeed, multiTap, autoBot, refClaimed, leagueClaimed, taskClaimed, lastClick]);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setLoaded(false)
            }, 2000)
        }
    }, [loading]);

    return (<>

        <NextUIProvider>
            {loaded ? <LoadingComponent/> : <></>}
            <Router location={location} navigator={reactNavigator}>
                <div className="app" style={{display:loaded?"none":""}}>
                    <main className="pt-5">
                        <Routes>
                            <Route path="/" Component={Tap}/>
                            <Route path="/boost" Component={Boost}/>
                            <Route path="/stat" Component={Stats}/>
                            <Route path="/task" Component={Tasks}/>
                            <Route path="/referral" Component={Referral}/>
                            <Route path="*" Component={Tap}/>
                        </Routes>
                    </main>
                    <footer
                        className="flex flex-row mt-auto mb-0.5 items-center content-center justify-items-center place-items-center">
                        <Menu/>
                    </footer>
                </div>
            </Router>
        </NextUIProvider>

    </>);
}

