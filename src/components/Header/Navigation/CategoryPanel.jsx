import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { MdOutlineClose } from "react-icons/md";  // React Icon instead of MUI
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CategoryPanel = ({ isOpenCatPanel, setIsOpenCatPanel }) => {
  const [openSubmenu, setOpenSubmenu] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const categories = [
    {
      name: "Nature & Landscape",
      subcategories: ["Hill", "Landscape", "River", "Mountain", "Forest"],
    },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: isMobile ? "100vw" : 320,
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-xl font-bold">Categories</h3>
        <button onClick={() => setIsOpenCatPanel(false)} className="text-2xl">
          <MdOutlineClose />
        </button>
      </div>

      {/* Category List */}
      <div className="overflow-y-auto h-[calc(100%-64px)]">
        {categories.map((category, index) => (
          <div key={category.name} className="border-b">
            <Button
              fullWidth
              onClick={() =>
                setOpenSubmenu(openSubmenu === index ? null : index)
              }
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                color: "gray",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              {category.name}
              {openSubmenu === index ? <FaChevronUp /> : <FaChevronDown />}
            </Button>

            {/* Subcategories */}
            {openSubmenu === index && (
              <div className="bg-gray-50 pl-4">
                {category.subcategories.map((sub) => (
                  <Button
                    key={sub}
                    component={Link}
                    to="/"
                    fullWidth
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      padding: "8px 16px",
                      color: "#555",
                      "&:hover": { backgroundColor: "#eaeaea" },
                    }}
                  >
                    {sub}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Box>
  );

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "left"}
      open={isOpenCatPanel}
      onClose={() => setIsOpenCatPanel(false)}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          height: isMobile ? "70vh" : "100%",
          overflow: "visible",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default CategoryPanel;
