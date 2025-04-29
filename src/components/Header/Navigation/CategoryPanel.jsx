import * as React from "react";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md"; // React Icon instead of MUI
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Box, Button } from "@mui/material";
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

  if (!isOpenCatPanel) return null; 

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isMobile ? "100vw" : "320px",
        height: isMobile ? "70vh" : "100vh",
        bgcolor: "background.paper",
        zIndex: 1300, 
        boxShadow: 3, 
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
                "&:hover": { backgroundColor: "#FFCB00" },
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
                      color: "#FFCB00",
                      "&:hover": { backgroundColor: "#FFCB00" },
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
};

export default CategoryPanel;