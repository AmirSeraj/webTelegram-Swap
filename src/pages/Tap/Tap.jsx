import "./Tap.css";
import Balance from "@/components/Balance/Balance";
import { TONConnect } from "@/components/Ton/TONConnect";
import { Trophy } from "@/components/Trophy/Trophy.jsx";
import Coin from "@/components/Coin/Coin.jsx";
import EnergyProgress from "@/components/Energy/EnergyBar.jsx";
import EnergyText from "@/components/Energy/EnergyText.jsx";
import { useEffect } from "react";
import { useData } from "@/components/Context.jsx";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";


/**
 * @returns {JSX.Element}
 */

export function Tap() {
    const {earned,setEarned,loaded} = useData()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        if (earned !== 0 && !loaded) {
            onOpen()
        }
    }, [earned,loaded]);



    return (<div id={"coin-icon"} className="game text-pink-100">
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
                        <ModalHeader className="flex flex-col gap-1">While you were out</ModalHeader>
                        <ModalBody>
                            <p className="font-normal text-pink-100 text-center">
                                Bot generated <b>{earned.toLocaleString()}</b> SPX for you
                            </p>

                            <Button color="secondary" onPress={() => {
                                onClose()
                                setEarned(0)
                            }}
                            >
                                Fine!
                            </Button>
                        </ModalBody>

                    </>)}
                </ModalContent>
            </Modal>
      <div className="item wallet">
        <TONConnect />
      </div>
      <div className="item point">
        <Balance />
      </div>
      <div className="item league">
        <Trophy />
      </div>
      <div className="item coin">
        <Coin />
      </div>
      <div className="item energy w-[100%] px-7 flex flex-col gap-2 pb-2">
        <EnergyText />
        <EnergyProgress />
      </div>
    </div>
  );
}
