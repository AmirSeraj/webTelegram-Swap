import {Button, Card, CardBody, Progress, Tab, Tabs} from "@nextui-org/react";
import {useData} from "@/components/Context.jsx";
import {useState} from "react";
import {Refs, Trophies} from "@/components/Trophy/Trophy";
import Balance from "@/components/Balance/Balance.jsx"


export default function TaskMenu() {

    function containsObject(obj, list) {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }

        return false;
    }


    const {
        referrals,
        amount,
        taskClaimed,
        tasks,
        league,
        leagueClaimed,
        setLeagueClaimed,
        balanceUp,
        refClaimed,
        setRefClaimed,
        setTaskClaimed,
        userid
    } = useData()


    const [btn_state, setBtn_state] = useState([])
    const [btn_state_ref, setBtn_state_ref] = useState([])
    const user_id = userid

    return (<div
        className="flex w-full flex-col items-center justify-start rounded-md shadow-lg px-8 pb-2 bg-transparent text-pink-100">
        <Balance/>
        <Tabs aria-label="Options" variant="underlined" fullWidth color={"secondary"}>
            <Tab className="scrollable" key="Special"
                 title={<span className="text-pink-100 hover:text-pink-300 text-large">Special</span>}>
                <div className="overflow-y-scroll max-h-[44vh] w-[80vw]">
                    {tasks.map(function (data) {
                        return (<Card key={data.id + "task"} id={"task_" + data.id} taskType={data.typess}
                                      className="w-full flex my-3 bg-opacity-15 text-pink-100 bg-fuchsia-700">
                            <CardBody className="flex flex-row items-center w-full">
                                <div className="flex flex-col items-center w-full gap-3">
                                    <div className="w-[70vw] flex flex-row justify-between items-center">
                                        <div className="flex flex-row items-center justify-start">
                                            <div className="w-12 h-12">
                                                <img className="scale-75 w-10 h-10"
                                                     src={data.typess === "tg" ? "./telegram.png" : data.typess === "x" ? "./x.png" : "./special.png"}
                                                     alt={data.title}/>
                                            </div>
                                            <div className="flex flex-col justify-between">
                                                <div className="flex">
                                                    <span className="text-sm text-center">{data.title}</span>
                                                </div>
                                                <div className="flex flex-row items-center">
                                                    <img src={"./coin32.png"} alt="coin"
                                                         className="scale-50"/>
                                                    <span
                                                        className="text-sm font-normal">{data.reward.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {!containsObject(data.id, taskClaimed) ? <Button id={"btn_task_" + data.id}
                                                                                         className="flex items-center"
                                                                                         color="secondary"
                                                                                         variant="bordered"
                                                                                         size={"sm"}
                                                                                         radius="md"
                                                                                         onPress={async () => {

                                                                                             const el = document.getElementById("btn_task_" + data.id)
                                                                                             let status = false;
                                                                                             if (el.innerText === "Go") {
                                                                                                 el.innerText = "Check"
                                                                                                 window.open(data.url,"_blank")
                                                                                             } else if (el.innerText === "Check") {
                                                                                                 if (data.typess === "tg") {
                                                                                                     let ret = data.url.replace('https://t.me/', '@');
                                                                                                     await fetch(`https://api.spxswap.com/${user_id}/${ret}`)
                                                                                                         .then((res) => {
                                                                                                             return res.json();
                                                                                                         })
                                                                                                         .then((resp) => {
                                                                                                             status = resp.statusof
                                                                                                         })
                                                                                                 } else {
                                                                                                     status = true
                                                                                                 }
                                                                                             }
                                                                                             if (status) {
                                                                                                 setTaskClaimed([...taskClaimed, data.id])
                                                                                                 balanceUp(data.reward)

                                                                                                 // setBalance(balance + data.reward)
                                                                                             }
                                                                                         }}
                                        >
                                            Go
                                        </Button> : <Button id={"btn_task_" + data.id}
                                                            className="flex items-center"
                                                            color="secondary"
                                                            variant="bordered"
                                                            size={"sm"}
                                                            isDisabled={true}
                                                            radius="md">Claimed</Button>}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>)
                    })}
                </div>
            </Tab>
            <Tab className="scrollable" key="League"
                 title={<span className="text-pink-100 hover:text-pink-300 text-large">League</span>}>
                <div className="overflow-y-scroll max-h-[44vh] w-[80vw]">
                    {Trophies.map(function (data, index) {

                        for (let i = 0; i < data.length; i++) {
                            setBtn_state([...btn_state, false])
                        }

                        if (!containsObject(index, leagueClaimed)) {
                            return (<Card key={index + "league"} id={"league_" + index}
                                          className="w-full flex my-3 bg-opacity-15 text-pink-100 bg-fuchsia-700">
                                <CardBody className="flex flex-row items-center w-full">
                                    <div className="flex flex-col items-center w-full gap-3">
                                        <div className="w-[70vw] flex flex-row justify-between items-center">
                                            <div className="flex flex-row items-center justify-start">
                                                <div className="w-12 h-12">
                                                    <img src={data.src} alt={data.title}/>
                                                </div>
                                                <div className="flex flex-col justify-start items-center">
                                                    <div className="flex">
                                                        <span className="text-sm">{data.title}</span>
                                                    </div>
                                                    <div className="flex flex-row items-center">
                                                        <img src={"./coin32.png"} alt="coin"
                                                             className="scale-50"/>
                                                        <span
                                                            className="text-sm font-normal">{data.reward.toLocaleString()}</span>
                                                    </div>
                                                </div>

                                            </div>
                                            <Button id={"btn_league_" + index}
                                                    className="flex items-center"
                                                    color="secondary"
                                                    variant="bordered"
                                                    size={"sm"}

                                                    style={{
                                                        display: containsObject(league, leagueClaimed) ? "none" : "flex"
                                                    }}
                                                    radius="md"
                                                    isDisabled={league <= index}
                                                    isLoading={btn_state[index]}
                                                    onPress={() => {
                                                        let newArr = [...btn_state]
                                                        newArr[index] = true
                                                        setBtn_state(newArr)
                                                        setTimeout(() => {
                                                            setLeagueClaimed([...leagueClaimed, index])
                                                            balanceUp(data.reward)
                                                        }, 1500)

                                                    }}
                                            >
                                                Claim
                                            </Button>
                                        </div>
                                        <div className="w-[70vw]">
                                            <Progress
                                                size="md"
                                                color={amount > data.threshold ? "success" : "warning"}
                                                maxValue={data.threshold}
                                                minValue={0}
                                                value={amount}
                                                classNames={{base: "m-0.5"}}
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>)
                        } else {
                            return (<div key={index + "league"}></div>)
                        }

                    })}
                </div>
            </Tab>
            <Tab className="scrollable" key="Referral"
                 title={<span className="text-pink-100 hover:text-pink-300 text-large">Referral</span>}>
                <div className="overflow-y-scroll max-h-[44vh] w-[80vw]">
                    {Refs.map(function (data, index) {

                        for (let i = 0; i < data.length; i++) {
                            setBtn_state_ref([...btn_state_ref, false])
                        }
                        if (!containsObject(index, refClaimed)) {
                            return (<Card key={index + "ref"} id={"referral_" + index}
                                          className="w-full flex my-3 bg-opacity-15 text-pink-100 bg-fuchsia-700">
                                <CardBody className="flex flex-row items-center w-full">
                                    <div className="flex flex-col items-center w-full gap-3">
                                        <div className="w-[70vw] flex flex-row justify-between items-center">
                                            <div className="flex flex-row items-center justify-start">
                                                <div className="w-12 h-12">
                                                    <img src="https://img.icons8.com/dusk/64/omnichannel.png"
                                                         alt={data.title}/>
                                                </div>
                                                <div className="flex flex-col justify-start items-center">
                                                    <div className="flex">
                                                        <span className="text-sm">{data.title}</span>
                                                    </div>
                                                    <div className="flex flex-row items-center">
                                                        <img src={"./coin32.png"} alt="coin"
                                                             className="scale-50"/>
                                                        <span
                                                            className="text-sm font-normal">{data.reward.toLocaleString()}</span>
                                                    </div>
                                                </div>

                                            </div>
                                            <Button id={"btn_ref_" + index}
                                                    className="flex items-center"
                                                    color="secondary"
                                                    variant="bordered"
                                                    size={"sm"}
                                                    style={{
                                                        display: containsObject(referrals, refClaimed) ? "none" : "flex"
                                                    }}
                                                    radius="md"
                                                    isDisabled={referrals <= Refs[index].threshold}
                                                    isLoading={btn_state_ref[index]}
                                                    onPress={() => {
                                                        let newArr = [...btn_state_ref]
                                                        newArr[index] = true
                                                        setBtn_state_ref(newArr)
                                                        setTimeout(() => {
                                                            setRefClaimed([...refClaimed, index])
                                                            balanceUp(data.reward)
                                                        }, 1500)

                                                    }}
                                            >
                                                Claim
                                            </Button>
                                        </div>
                                        <div className="w-[70vw]">
                                            <Progress
                                                size="md"
                                                color={referrals > data.threshold ? "success" : "warning"}
                                                maxValue={data.threshold}
                                                minValue={0}
                                                value={referrals}
                                                classNames={{base: "m-0.5"}}
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>)
                        } else {
                            return (<div key={index + "ref"}></div>)
                        }
                    })}
                </div>
            </Tab>
        </Tabs>
    </div>)
}