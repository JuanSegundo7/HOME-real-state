import React, { useRef, useState, useEffect } from "react";
import { IPrice } from "../../../models/types";
import { useRouter } from "next/router";
import Image from "next/image";

function DropdownPrice({ values, setSearchState }: any) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { logo, title } = values;

  const { LowestPrice, HighestPrice } = router.query;

  const [price, setPrice] = useState<IPrice>({
    lowestPrice: 0,
    highestPrice: 0,
  });

  useEffect(() => {
    setPrice({
      lowestPrice: Number(LowestPrice) ? Number(LowestPrice) : 0,
      highestPrice: Number(HighestPrice) ? Number(HighestPrice) : 0,
    });
  }, [LowestPrice, HighestPrice]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setPrice((prevFormValues) => ({
      ...prevFormValues,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    setSearchState((prevState: any) => ({
      ...prevState,
      price: price,
    }));
  }, [price]);

  return (
    <div className="flex items-center gap-4 w-auto max-w-[210px]">
      <div>
        <Image src={logo} alt="logo" width={40} height={40} />
      </div>
      <div className="flex items-left flex-col">
        <p className="text-sm font-light text-left text-home-grey">{title}</p>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`font-bold w-full flex items-center justify-start text-sm rounded-lg leading-5`}
        >
          {!price.highestPrice && !price.lowestPrice ? (
            "€0"
          ) : (
            <>
              €
              {price.lowestPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              - €
              {price.highestPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </>
          )}
        </button>
        {isOpen && (
          <div className="relative h-full w-ful">
            <div
              ref={dropdownRef}
              className="bg-white p-2 rounded-lg absolute top-1 w-[205px] border-2 max-h-[150px] overflow-y-auto -left-[60px]"
            >
              <div className="flex flex-col p-2">
                <p className="mb-1">Precio:</p>
                <div className="flex flex-col items-center justify-center gap-2">
                  <input
                    type="number"
                    onBlur={(e) =>
                      e.target.setAttribute("placeholder", "Mínimo")
                    }
                    name="lowestPrice"
                    className="w-full rounded-lg px-2 py-1 border border-home-light-blue focus:outline-none"
                    placeholder="Mínimo"
                    value={price.lowestPrice === 0 ? "" : price.lowestPrice}
                    onChange={handleChange}
                  />
                  <input
                    className="w-full rounded-lg px-2 py-1 border border-home-light-blue focus:outline-none"
                    type="number"
                    onBlur={(e) =>
                      e.target.setAttribute("placeholder", "Máximo")
                    }
                    name="highestPrice"
                    placeholder="Máximo"
                    value={price.highestPrice === 0 ? "" : price.highestPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownPrice;
