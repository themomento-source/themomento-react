import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { MdClose } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";

import { Link } from "react-router-dom";

import { useEffect } from "react";

const CategoryPanel = (props) => {
  const [submenuIndex, setSubmenuIndex] = React.useState(null);

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-3 text-[18px] font-[700] text-black flex items-center justify-between">
        Catagories{" "}
        <MdClose
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[20px]"
        />
      </h3>

      <div className="scroll">
        <ul className="w-full">
          <li className="list-none flex items-center relative">
            <Link to="/" className="w-full">
              <Button
                className="w-full cursor-pointer !text-left !justify-start !px-4
              !text-[rgba(0,0,0.8)]"
              >
                Nature & Landscape
              </Button>
            </Link>

            {submenuIndex === 0 ? (
              <FiMinusSquare
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            )}

            {submenuIndex === 0 && (
              <ul className="submenu absolute top-[100%] left-[0%] w-full pl-3">
                <li className="list-none relative">
                  <Link to="/">
                    <Button
                      className="w-full cursor-pointer !text-left !justify-start !px-4
              !text-[rgba(0,0,0.8)]"
                    >
                      Hill
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to="/">
                    <Button
                      className="w-full cursor-pointer !text-left !justify-start !px-4
              !text-[rgba(0,0,0.8)]"
                    >
                      Landscape
                    </Button>
                  </Link>
                </li>

                <li className="list-none relative">
                  <Link to="/">
                    <Button
                      className="w-full cursor-pointer !text-left !justify-start !px-4
              !text-[rgba(0,0,0.8)]"
                    >
                      River
                    </Button>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </Box>
  );
  return (
    <>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default CategoryPanel;
