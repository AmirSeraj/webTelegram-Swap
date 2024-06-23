import {useData} from "@/components/Context.jsx";
import {Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import {useState} from "react";


export const upgradeMultiPriceList = [200, 500, 1000, 5000, 8000, 10000, 25000, 40000, 75000, 100000, 200000, 300000, 400000, 500000, 700000, 900000, 1000000, 1200000, 1500000, 2000000]
export const upgradeLimitPriceList = [100, 300, 1000, 3000, 5000, 10000, 15000, 75000, 190000, 225000, 400000, 700000, 1000000,]
export const upgradeSpeedPriceList = [5000, 30000, 150000, 400000]
export const upgradeAutoPriceList = [200000]


export default function Boosts() {
    const {
        multiTap,
        energyLimit,
        energySpeed,
        autoBot,
        setMultiTap,
        setEnergyLimit,
        setEnergySpeed,
        setAutoBot,
        balanceDown,
        balance
    } = useData()

    const [list, setList] = useState(null)
    const [desc, setDesc] = useState(null)
    const [titleUp, setTitleUp] = useState(null)
    const [level, setLevel] = useState(null)
    const [setterUp, setSetterUp] = useState(null)

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (<div className="flex flex-col gap-5 w-[100%]">
        <Modal
            backdrop="blur"
            isOpen={isOpen}
            placement={"center"}
            onOpenChange={onOpenChange}
            radius="lg"
            classNames={{
                body: "py-6",
                backdrop: "",
                base: "border-[#292f46] bg-[#130B0BFF] text-pink-100",
                header: "border-b-[1px] border-[#292f46] text-center text-2xl font-bold text-pink-200",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">{titleUp}</ModalHeader>
                    <ModalBody>
                        <p className="font-normal text-pink-100 text-center">
                            {desc}
                        </p>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="secondary" onPress={() => {
                            if (balance > list[level - 1]) {
                                if (setterUp === "multi") {
                                    balanceDown(list[level - 1])
                                    setMultiTap(level + 1)
                                } else if (setterUp === "limit") {
                                    balanceDown(list[level - 1])
                                    setEnergyLimit(level + 1)
                                } else if (setterUp === "bot") {
                                    setAutoBot(true)
                                    balanceDown(list[0])
                                } else if (setterUp === "speed") {
                                    balanceDown(list[level - 1])
                                    setEnergySpeed(level + 1)

                                }
                            }
                            onClose()
                        }}
                                isDisabled={balance <= list[level - 1]}
                        >
                            {balance >= list[level] ? "Upgrade Now" : setterUp === "bot" ? "Enable Now" : "insufficient Balance!"}
                        </Button>
                    </ModalBody>

                </>)}
            </ModalContent>
        </Modal>
        <Card className="bg-transparent border-t-2 w-[100%]" isPressable={multiTap !== upgradeMultiPriceList.length}
              onPress={() => {
                  setList(upgradeMultiPriceList)
                  setDesc("Gain +1 point per tap! Upgrade now to increase your coin tapping power!")
                  setTitleUp("Upgrading Multi-Tap")
                  setLevel(multiTap)
                  setSetterUp("multi")
                  onOpen()
              }}>
            <CardBody className="overflow-visible py-0.5 flex justify-between flex-row items-center gap-36 w-full">
                <div className="flex flex-col content-start">
                    <h2 className="font-bold text-sm text-pink-100">Multi-Tap</h2>
                    <h4 className="font-semibold text-sm text-pink-100 flex flex-row items-center">level: {multiTap}

                        {multiTap !== upgradeMultiPriceList.length ?
                            <img src={"./coin32.png"} alt="coin" className="scale-50"/> : <></>}
                        {multiTap !== upgradeMultiPriceList.length ? (upgradeMultiPriceList[multiTap - 1]).toLocaleString() : " - Max"}
                    </h4>
                </div>
                <img
                    alt="Card background"
                    className="object-contain w-12 h-12"
                    src={"./multitap.png"}
                    width={120}
                    height={120}
                />
            </CardBody>
        </Card>
        <Card className="bg-transparent border-t-2" isPressable={energySpeed !== upgradeSpeedPriceList.length}
              onPress={() => {
                  setList(upgradeSpeedPriceList)
                  setDesc("Gain +1 energy per second! Upgrade now to boost your energy speed!")
                  setTitleUp("Upgrading Energy Speed")
                  setLevel(energySpeed)
                  setSetterUp("speed")
                  onOpen()
              }}>
            <CardBody className="overflow-visible py-0.5 flex justify-between flex-row items-center gap-36 w-full">
                <div className="flex flex-col content-start">
                    <h2 className="font-bold text-sm text-pink-100">Energy Speed</h2>
                    <h4 className="font-semibold text-sm text-pink-100 flex flex-row items-center">level: {energySpeed}
                        {energySpeed !== upgradeSpeedPriceList.length ?
                            <img src={"./coin32.png"} alt="coin" className="scale-50"/> : <></>}
                        {energySpeed !== upgradeSpeedPriceList.length ? (upgradeSpeedPriceList[energySpeed - 1]).toLocaleString() : " - Max"}
                    </h4>
                </div>
                <img
                    alt="Card background"
                    className="object-cover rounded-xl w-12 h-12"
                    src="./Speed.png"
                    width={120}
                    height={120}
                />
            </CardBody>
        </Card>
        <Card className="bg-transparent border-t-2" isPressable={energyLimit !== upgradeLimitPriceList.length}
              onPress={() => {
                  setList(upgradeLimitPriceList)
                  setDesc("Increase your energy limit by +500! Upgrade now to expand your energy bank")
                  setTitleUp("Upgrading Energy Limit")
                  setLevel(energyLimit)
                  setSetterUp("limit")
                  onOpen()
              }}>
            <CardBody className="overflow-visible py-0.5 flex justify-between flex-row items-center gap-36 w-full">
                <div className="flex flex-col content-start">
                    <h2 className="font-bold text-sm text-pink-100">Energy Limit</h2>
                    <h4 className="font-semibold text-sm text-pink-100 flex flex-row items-center">level: {energyLimit}
                        {energyLimit !== upgradeLimitPriceList.length &&
                            <img src={"./coin32.png"} alt="coin" className="scale-50"/>}
                        {energyLimit !== upgradeLimitPriceList.length ? (upgradeLimitPriceList[energyLimit - 1]).toLocaleString() : " - Max"}
                    </h4>
                </div>
                <img
                    alt="Card background"
                    className="object-cover rounded-xl w-12 h-12"
                    src="./limit.png"
                    width={120}
                    height={120}
                />
            </CardBody>
        </Card>
        <Card className="bg-transparent border-t-2" isPressable={!autoBot} onPress={() => {
            setList(upgradeAutoPriceList)
            setDesc("Gain profit even offline for 12 hours! Confirm to activate and boost your earnings!")
            setTitleUp("Enabling Auto-Bot")
            setLevel(autoBot ? 2 : 1)
            setSetterUp("bot")
            onOpen()
        }}>
            <CardBody className="overflow-visible py-0.5 flex justify-between flex-row items-center gap-36 w-full">
                <div className="flex flex-col content-start">
                    <h2 className="font-bold text-sm text-pink-100">Auto Bot</h2>
                    <h4 className="font-semibold text-sm text-pink-100 flex flex-row items-center">{autoBot ? "enabled" : "disabled"}
                        {!autoBot && <img src={"./coin32.png"} alt="coin" className="scale-50"/>}
                        {!autoBot && (upgradeAutoPriceList[0]).toLocaleString()}
                    </h4>
                </div>
                <img
                    alt="Card background"
                    className="object-cover rounded-xl w-12 h-12"
                    src="./bot.png"
                    width={120}
                    height={120}
                />
            </CardBody>
        </Card>
    </div>)
}