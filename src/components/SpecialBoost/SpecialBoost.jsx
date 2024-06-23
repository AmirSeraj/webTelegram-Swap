import {useData} from "@/components/Context.jsx";
import {Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function SpecialBoost() {
    const {guruLeft, refillLeft, activateGuru, activateRefill, setEnergy, MaxEnergy} = useData()
    const navigate = useNavigate();
    const [desc, setDesc] = useState(null)
    const [titleUp, setTitleUp] = useState(null)
    const [v, setV] = useState(null)


    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (<div className="flex gap-5">
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
                            if (titleUp === "refill") {
                                activateRefill()
                            } else {
                                activateGuru()
                            }
                            onClose()
                            navigate("/")
                        }}
                                isDisabled={v === 0}
                        >
                            {v > 0 ? "Enable Now" : "Not available now, come back tomorrow"}
                        </Button>
                    </ModalBody>
                </>)}
            </ModalContent>
        </Modal>
        <Card className="bg-transparent border-t-2" isPressable onPress={() => {
            setTitleUp("guru")
            setV(guruLeft)
            setDesc("Your taps are worth 5x for 20 seconds! Confirm to activate this power boost!")
            onOpen()


        }}>
            <CardBody className="overflow-visible py-2 flex justify-between flex-row items-center gap-2">
                <div className="flex flex-col content-start">
                    <h2 className="font-bold text-sm text-pink-100">Angry Mode</h2>
                    <h4 className="font-semibold text-sm text-pink-100">Available: {guruLeft}/3</h4>
                </div>
                <img
                    alt="Card background"
                    className="object-contain w-12 h-12"
                    src="./Angry.png"
                    width={120}
                    height={120}
                />
            </CardBody>
        </Card>
        <Card className="bg-transparent border-t-2" isPressable onPress={() => {
            setTitleUp("refill")
            setV(refillLeft)
            setDesc("Instantly fill your energy bar! Upgrade now for a full energy boost!")
            onOpen()


        }}>
            <CardBody className="overflow-visible py-2 flex justify-between flex-row items-center gap-2">
                <div className="flex flex-col content-start">
                    <h2 className="font-bold text-sm text-pink-100">Energy Refill</h2>
                    <h4 className="font-semibold text-sm text-pink-100">Available: {refillLeft}/3</h4>
                </div>
                <img
                    alt="Card background"
                    className="object-cover rounded-xl w-12 h-12"
                    src="./battery.png"
                    width={120}
                    height={120}
                />
            </CardBody>
        </Card>
    </div>)
}