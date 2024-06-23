import {useData} from "@/components/Context.jsx";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import "./coin.css"

const Coin = () => {
    const [texts, setTexts] = useState([]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTexts(prevItems => {
                return prevItems.map(item => ({
                    ...item, position: {
                        ...item.position, y: item.position.y - 8
                    }, opacity: item.opacity - 0.02
                })).filter(item => item.opacity > 0);
            });
        }, 30);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTexts(prevTexts => prevTexts.slice(1));
        }, 1000);
        return () => clearTimeout(timer);
    }, [texts.length > 0]);


    useEffect(() => {
        setTexts(prevTexts => prevTexts.slice(1));
    }, [texts.length > 24]);

    const {isGuru, clickValue, tap} = useData()

    return (<div className="w-full flex justify-center items-center">
        {isGuru() && <div className="absolute z-0">
            <div className="stage">
                <div className="campfire">
                    <div className="sparks">
                        <div className="spark"></div>
                        <div className="spark"></div>
                        <div className="spark"></div>
                        <div className="spark"></div>
                        <div className="spark"></div>
                        <div className="spark"></div>
                        <div className="spark"></div>
                        <div className="spark"></div>
                    </div>
                    <div className="fire">
                        <div className="fire__red">
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                        </div>
                        <div className="fire__orange">
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                        </div>
                        <div className="fire__yellow">
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                        </div>
                        <div className="fire__white">
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
        <motion.div
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            className=" w-[55vw] h-[55vw] rounded-full relative"
        >
            <img
                className="cursor-pointer w-full h-full"
                src="./coin.png"
                alt="coin"

            />
            <div
                id="LinkArea"
                onTouchStart={(ev) => {
                    ev.preventDefault();
                    for (let i = 0; i < ev.targetTouches.length; i++) {
                        const tapStatus = tap();
                        if (tapStatus) {
                            const {pageX, pageY} = ev.changedTouches[i];
                            const newText = {
                                value: `+${clickValue()}`, position: {x: pageX, y: pageY}, opacity: 1,
                            };
                            setTexts(old => [...old, newText]);
                        }

                    }
                }}

                className="absolute w-[60vw] h-[60vw] rounded-full bg-transparent z-20 top-0 right-0"
            />
        </motion.div>
        {texts.map((text, index) => (<div
            key={index}
            style={{
                color: "#e9e2fb",
                fontSize: "8vw",
                fontWeight: "bold",
                position: "absolute",
                top: text.position.y - 30,
                left: text.position.x,
                padding: "5px",
                zIndex: 9999,
                pointerEvents: "none",
                transition: "opacity 0.5s ease", // Add a smooth fading transition
                opacity: text.opacity,
            }}
        >
            {text.value}
        </div>))}
    </div>);
}

export default Coin;