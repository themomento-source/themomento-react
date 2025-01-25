import React from "react";
import TextField from "@mui/material/TextField";

function Checkout() {
  return (
    <section className="py-10">
      <div className="container flex gap-5">
        <div className="leftCo w-[70%]">
          <div className="card bg-white shadow-md p-5 rounded-md w-full">
            <h1>Billing Details</h1>

            <form className="w-full mt-5">
              <div className="flex items-center gap-3 pb-5">
                <div className="col w-[50%]">
                  <TextField
                    className="w-full"
                    label="Full Name *"
                    variant="outlined"
                    size="small"
                  />
                </div>

                <div className="col w-[50%]">
                  <TextField
                    type="country"
                    className="w-full"
                    label="Country *"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <h4 className="text-[16px] font-[500]">Street Address *</h4>
              <div className="flex items-center gap-3 pb-5 pt-3">
                <div className="col w-[100%]">
                  <TextField
                    className="w-full"
                    label="House No. and Street Name*"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pb-5 pt-3">
                <div className="col w-[100%]">
                  <TextField
                    className="w-full"
                    label="Apartment, Suite, unit, etc. (optional)"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <h4 className="text-[16px] font-[500]">City*</h4>

              <div className="flex items-center gap-3 pb-5 pt-3">
                <div className="col w-[100%]">
                  <TextField
                    className="w-full"
                    label="City"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <h4 className="text-[16px] font-[500]">State/County</h4>

              <div className="flex items-center gap-3 pb-5 pt-3">
                <div className="col w-[100%]">
                  <TextField
                    className="w-full"
                    label="State"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <h4 className="text-[16px] font-[500]">Postcode/ZIP *</h4>

              <div className="flex items-center gap-3 pb-5 pt-3">
                <div className="col w-[100%]">
                  <TextField
                    className="w-full"
                    label="ZIP Code"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pb-5">
                <div className="col w-[50%]">
                  <TextField
                    className="w-full"
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                  />
                </div>

                <div className="col w-[50%]">
                  <TextField
                    type="email"
                    className="w-full"
                    label="Email *"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="rightCol w-[30%]">
          <div className="card shadow-md bg-white p-5 rounded-md">
            <h2 className="mb-4 font-[600] text-[22px]">Your Order</h2>

            <div className="flex items-center py-3 border-t border-b border-[rgba(0,0,0,0.1)] justify-between">
              <span className="text-[18px] font-[600]">Product Name</span>
              <span className="text-[18px] font-[600]">Subtotal</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="part1 flex items-center gap-3">
                <div className="img cursor-pointer">
                  <img
                    src="https://images.pexels.com/photos/29469384/pexels-photo-29469384/free-photo-of-women-in-traditional-dresses-amidst-vibrant-lotus-field.jpeg"
                    className="w-16 h-16 object-cover rounded-md hover:scale-105 transition-all"
                  />
                </div>
                <div className="info">
                  <span className="block text-[16px]">Lotus Field Beauty</span>
                </div>
              </div>
              <div className="subtotal text-[16px]">$17</div>
            </div>

            <div className="flex justify-center mt-5">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full font-[600] text-[16px]">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
