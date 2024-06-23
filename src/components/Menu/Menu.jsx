import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link } from "@/components/Link/Link.jsx";
import { useLocation } from "react-router-dom";

export default function Menu() {
  const menu = [
    {
      title: "Stats",
      img: "./m1.png",
      url: "/stat",
    },
    {
      title: "Boost",
      img: "./m2.png",
      url: "/boost",
    },
    {
      title: "Tap",
      img: "./m3.png",
      url: "/",
    },
    {
      title: "Tasks",
      url: "/task",
      img: "./m5.png",
    },
    {
      title: "Referral",
      url: "/referral",
      img: "./m4.png",
    },
  ];
  const location = useLocation();

  return (
      <div className="w-full items-center justify-self-center place-items-center gap-2 grid grid-cols-5 py-3 mx-4">
        {menu.map((item, index) =>{
          const pathName = location.pathname
          return(
              <Link to={item.url} key={index}>
                <Card className={"h-24 w-16 bg-transparent border-pink-300 border-b-3 border-t-1 "+ (pathName === item.url && "bg-pink-100 bg-opacity-20")} shadow="sm" key={index}
                      isPressable onPress={() => console.log("item pressed")}>
                  <CardBody className="overflow-visible p-0 bg-transparent">
                    <Image
                        // shadow="lg"
                        disableSkeleton
                        width="100%"
                        alt={item.title}
                        className="w-full object-cover"
                        src={item.img}
                    />
              </CardBody>
              <CardFooter className="text-small justify-center text-pink-200 bg-transparent">
                {item.title}
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

