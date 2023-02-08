import { db } from "@/server/firebase";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Add() {
  // Declare state variables to store the selected option, generated SKU, and the product details
  const [selectedOption, setSelectedOption] = useState("");
  const route = useRouter();
  const [product, setProduct] = useState({
    sku: "",
    name: "",
    price: "",
    size: "",
    height: "",
    width: "",
    length: "",
    weight: "",
  });

  // Event handler to update the product state when the input changes
  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Event handler to update the selected option when the user selects a different option
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Event handler to submit the product to the database when the form is submitted
  const submitProduct = async (e) => {
    e.preventDefault();

    // Get a reference to the "products" collection in the database
    const productCollection = collection(db, "products");

    // Create a new product object to add to the database
    const productToAdd = {
      sku: product.sku,
      name: product.name,
      price: product.price,
      productType: selectedOption,
    };

    // Add additional properties to the product object based on the selected option
    if (selectedOption === "dvd") {
      productToAdd.size = product.size;
    } else if (selectedOption === "book") {
      productToAdd.weight = product.weight;
    } else if (selectedOption === "furniture") {
      productToAdd.height = product.height;
      productToAdd.width = product.width;
      productToAdd.length = product.length;
    }
    // Add the product to the database
    await addDoc(productCollection, productToAdd);

    // Redirect the user back to the home page
    return route.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-10">
      <div className="flex justify-between items-center border-b-2 border-[#424242] pb-2">
        <h1 className="text-2xl font-bold">Add a Product</h1>
        <div className="space-x-2">
          <button
            type="submit"
            form="product_form"
            value="Submit"
            className="px-4 py-2 bg-green-500 rounded-lg font-semibold text-white"
          >
            Save
          </button>
          <Link href="/">
            <button className="px-4 py-2 bg-red-500 rounded-lg font-semibold text-white ">
              Cancel
            </button>
          </Link>
        </div>
      </div>
      <form
        onSubmit={submitProduct}
        action=""
        className="mt-10 flex flex-col justify-center items-center font-semibold"
        id="product_form"
      >
        <div className=" max-w-sm w-full space-y-3 shadow-lg shadow-[#424242] p-5 rounded-md">
          <div className="max-w-xs w-full flex justify-between items-center">
            <label htmlFor="sku">SKU:</label>
            <input
              type="text"
              id="sku"
              name="sku"
              className="rounded-lg py-1 px-2"
              required
              value={product.sku}
              onChange={handleInputChange}
            />
          </div>
          <div className="max-w-xs w-full flex justify-between items-center">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="rounded-lg py-1 px-2"
              required
            />
          </div>
          <div className="max-w-xs w-full flex justify-between items-center">
            <label htmlFor="price">Price ($):</label>
            <input
              type="number"
              id="price"
              name="price"
              max={999999}
              min={0}
              value={product.price}
              onChange={handleInputChange}
              className="rounded-lg py-1 px-2"
              required
            />
          </div>
        </div>
        <div className="my-10 max-w-sm w-full space-y-8 shadow-lg shadow-[#424242] p-5 rounded-md">
          <div className="flex items-center justify-between">
            <label htmlFor="">Type switcher</label>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              name=""
              className="bg-white border-solid border-2 border-[#424242] rounded-lg"
              id="productType"
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="dvd" id="DVD">
                DVD
              </option>
              <option value="book" id="Book">
                Book
              </option>
              <option value="furniture" id="Furniture">
                Furniture
              </option>
            </select>
          </div>

          {selectedOption === "dvd" && (
            <div className="">
              <div className="max-w-sm  flex justify-between items-center ">
                <label htmlFor="size">Size (MB):</label>
                <input
                  type="number"
                  id="size"
                  name="size"
                  value={product.size}
                  onChange={handleInputChange}
                  placeholder=""
                  required
                  max={999999}
                  min={0}
                  className="rounded-lg py-1 px-2"
                />
              </div>
              <span className="text-sm text-red-500">
                * Please, provide size
              </span>
            </div>
          )}
          {selectedOption === "book" && (
            <div className="">
              <div className="max-w-sm  flex justify-between items-center ">
                <label htmlFor="weight">Weight (KG):</label>
                <input
                  type="number"
                  id="weigth"
                  name="weight"
                  max={999999}
                  min={0}
                  value={product.weight}
                  onChange={handleInputChange}
                  placeholder=""
                  required
                  className="rounded-lg py-1 px-2"
                />
              </div>
              <span className="text-sm text-red-500">
                * Please, provide weight
              </span>
            </div>
          )}
          {selectedOption === "furniture" && (
            <div className="max-w-sm space-y-3 ">
              <div className="flex justify-between items-center">
                <label htmlFor="height">Height (CM):</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={product.height}
                  onChange={handleInputChange}
                  placeholder=""
                  required
                  max={999999}
                  min={0}
                  className="rounded-lg py-1 px-2 m-0"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="width">Width (CM):</label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  max={999999}
                  min={0}
                  value={product.width}
                  onChange={handleInputChange}
                  placeholder=""
                  required
                  className="rounded-lg py-1 px-2 m-0"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="length">Lenght (CM)</label>
                <input
                  type="number"
                  id="length"
                  name="length"
                  max={999999}
                  min={0}
                  value={product.length}
                  onChange={handleInputChange}
                  placeholder=""
                  required
                  className="rounded-lg py-1 px-2"
                />
              </div>
              <span className="text-sm text-red-500">
                * Please, provide dimensions
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
