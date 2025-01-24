import Button from "@mui/material/Button";
import React from "react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiAngleDown } from "react-icons/tfi";
import CategoryPanel from "./CategoryPanel";
import { Link } from "react-router-dom";
import "../Navigation/style.css";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-[15%]">
            <Button
              className="!text-black gap-2 w-full"
              onClick={openCategoryPanel}
            >
              {" "}
              <GiHamburgerMenu className="text-[18px]" /> Shop by Catogories{" "}
              <TfiAngleDown className="text-[13px] ml-auto font-bold cursor-pointer" />{" "}
            </Button>
          </div>
          <div className="col_2 w-[70%]">
            <ul className="flex items-center gap-6 nav">
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link-transition !font-[500] !text-[rgba(0,0,0,9)] ] hover:!text-[#ff5252]">
                    Home
                  </Button>
                </Link>
              </li>

              <li className="list-none relative">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link-transition !font-[500] !text-[rgba(0,0,0,9)] ] hover:!text-[#ff5252]">
                    {" "}
                    Nature & Landscape{" "}
                  </Button>
                </Link>
                <div
                  className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md 
                opacity-0 transition-all"
                >
                  <ul>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0.8)] w-full !text-left !justify-start">
                          River
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0.8)] w-full !text-left !justify-start">
                          Hill
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0.8)] w-full !text-left !justify-start">
                          Sea
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0.8)] w-full !text-left !justify-start">
                          Desert
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0.8)] w-full !text-left !justify-start">
                          Garden
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0.8)] w-full !text-left !justify-start">
                          Mountain
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0.8)] w-full !text-left !justify-start">
                          Field
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button
                    className="!link-transition !font-[500] !text-[rgba(0,0,0,9)] ]
                   hover:!text-[#ff5252]"
                  >
                    {" "}
                    People & Potraits{" "}
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button
                    className="!link-transition !font-[500] !text-[rgba(0,0,0,9)] ]
                   hover:!text-[#ff5252]"
                  >
                    {" "}
                    Ethnic & Tribal Heritage{" "}
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link-transition !font-[500] !text-[rgba(0,0,0,9)] ] hover:!text-[#ff5252]">
                    {" "}
                    Travel & Architecture{" "}
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link-transition !font-[500] !text-[rgba(0,0,0,9)] ] hover:!text-[#ff5252]">
                    {" "}
                    Traditions & Festivals{" "}
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col_3 w-[15%]">
            <ul className="flex">
              <li className="list-none">
                <Link
                  to="/bloglisting"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="!link-transition !font-[500] !text-[rgba(0,0,0,9)] ] hover:!text-[#ff5252]">
                    Blog{" "}
                  </Button>
                </Link>
              </li>

              <li className="list-none">
                <Link
                  to="/photolisting"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="!link-transition !font-[500] !text-[rgba(0,0,0,9)] ] hover:!text-[#ff5252]">
                    Photo{" "}
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
      />
    </>
  );
};

export default Navigation;
